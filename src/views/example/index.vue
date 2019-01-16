<template>
    <article id="example">
        <z-form
                :form-items="formItems"
                :mergeModel="mergeModel"
                :api="testApi"
                _ref="homeForm"
                @afterSubmit="linkBack">
            <template slot="icon">
                <svg-icon name="chart" @click.native="handleClick" />
            </template>

            <template slot="testFormItem">
                <el-form-item label="测试插槽:" >
                    <el-checkbox
                            true-label="1"
                            false-label=""
                            v-model="mergeModel.zhonganAccessFlag">
                        接入对象
                    </el-checkbox>
                </el-form-item>
            </template>
        </z-form>

        <z-table
                :data="tableData"
                :columns="columns">
        </z-table>
    </article>
</template>

<script>
    import {columns} from "./columns";
    import {formItems} from "./formItems";
    import axios from 'util/axios'
    import {testApi} from "../../api/example";

    export default {
        name: "index",
        data() {
            return {
                mergeModel: {
                    zhonganAccessFlag:""
                },
                tableData: [],
                formItems:[]
            }
        },
        methods: {
            linkBack(res) {
                this.tableData = res.data.result.tableData
            },
            handleClick() {
                this.mergeModel.name = 'yeyan1996'
                this.mergeModel = {...this.mergeModel} //使vue组件刷新视图
            },
            findItem(key) {
                return this.formItems.find(formItem => formItem.key === key)
            },
            async getInfo() {
                //生产环境无法使用webpack提供的静态资源服务器
                let [res1, res2, res3] = await Promise.all([
                    axios.get('http://localhost:8070/mock.json'),
                    axios.get('http://localhost:8070/mock2.json'),
                    axios.get('http://localhost:8070/table.json'),
                ])
                this.findItem('asyncRadio').attrs.options = res1.data.result.options
                this.findItem('cascader').attrs.options = res2.data.result.options
                this.tableData = res3.data.result.tableData
            },
        },
        computed:{
            columns() {
                return columns
            },
            testApi() {
                return testApi
            }
            // formItems() {
            //     return formItems
            // }
        },
        mounted() {
            this.getInfo()
            this.formItems = formItems
        }
   }
</script>

<style lang="scss" scoped>
    article {
        padding: 40px;
    }
</style>