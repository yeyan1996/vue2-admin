<template>
    <article id="example">
        <z-form
                :form-items="formItems"
                :mergeForm="mergeForm"
                :api="testApi"
                name="homeForm"
                @after-submit="linkBack">
            <template slot="icon">
                <svg-icon name="chart" @click.native="handleClick"></svg-icon>
            </template>

            <template slot="testFormItem">
                <el-form-item label="测试插槽:" >
                    <el-checkbox
                            true-label="1"
                            false-label=""
                            v-model="mergeForm.zhonganAccessFlag">
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
                mergeForm: {
                    zhonganAccessFlag:""
                },
                tableData: [],
                testApi,
                columns,
                formItems
            }
        },
        methods: {
            linkBack(res) {
                this.tableData = res.data.result.tableData
            },
            handleClick() {
                this.mergeForm.name = 'yeyan1996'
                this.mergeForm = {...this.mergeForm} //使vue组件刷新视图
            },
            findItem(key) {
                return this.formItems.find(formItem => formItem.attrs && formItem.attrs.key === key )
            },
            async getInfo() {
                //生产环境无法使用webpack提供的静态资源服务器
                let [res1, res2, res3] = await Promise.all([
                    axios.get('http://localhost:8070/mock.json'),
                    axios.get('http://localhost:8070/mock2.json'),
                    axios.get('http://localhost:8070/table.json'),
                ])
                this.findItem('asyncRadio').attrs.options = res1.options
                this.findItem('cascader').attrs.options = res2.options
                this.tableData = res3.tableData
            },
        },
        mounted() {
            this.getInfo()
        }
   }
</script>

<style lang="scss" scoped>
    article {
        padding: 40px;
    }
</style>
