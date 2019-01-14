<template>
    <article id="example">
        <z-form
                :action="['home','login']"
                :form-items="formItems"
                :mergeModel="mergeModel"
                _ref="homeForm"
                :inline="false"
                @afterSubmit="linkBack">
            <template slot="icon">
                <svg-icon name="chart" @click.native="handleClick"></svg-icon>
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

    export default {
        name: "index",
        data() {
            return {
                mergeModel: {},
                tableData: [],
                formItems:[]
            }
        },
        methods: {
            linkBack() {
                console.log('linkBack')
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
                    axios.get('http://localhost:8080/mock.json'),
                    axios.get('http://localhost:8080/mock2.json'),
                    axios.get('http://localhost:8080/table.json'),
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