<template>
    <article id="example">
        <z-form
                :form-items="formItems"
                :mergeForm="mergeForm"
                :api="formApi"
                name="homeForm"
                @after-submit="showTableData">
        </z-form>

        <z-table
                :data="tableData"
                :columns="columns">
            <template slot-scope="{scope}" slot="testSlot">
                {{ process( scope.row.testSlot)}}
            </template>
        </z-table>
    </article>
</template>

<script>
    import {columns} from "./columns";
    import {formItems} from "./formItems";
    import {formApi, radioGroup, cascader} from "@/api/example";

    export default {
        name: "index",
        data() {
            return {
                mergeForm: {
                    zhonganAccessFlag: ""
                },
                tableData: [],
                formApi,
                columns,
                formItems
            }
        },
        methods: {
            showTableData(res) {
                this.tableData = res.tableData
            },
            findItem(key) {
                return this.formItems.find(formItem => formItem.attrs && formItem.attrs.key === key)
            },
            async getInfo() {
                let [res1, res2] = await Promise.all([
                    radioGroup(),
                    cascader(),
                ])
                this.findItem('asyncRadio').attrs.options = res1.options
                this.findItem('cascader').attrs.options = res2.options
            },
            process(str) {
                return `处理后的${str}`
            }
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
