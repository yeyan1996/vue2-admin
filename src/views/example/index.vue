<template>
    <article id="example">
        <z-form
                :inline="false"
                :form-items="formItems"
                :mergeForm="mergeForm"
                :api="formApi"
                name="homeForm"
                @after-submit="showTableData">
            <!--<template v-slot:icon>-->
            <!--<base-icon name="chart" @click.native="handleClick"></base-icon>-->
            <!--</template>-->

            <!--<template v-slot:testFormItem>-->
            <!--<el-form-item label="测试插槽:">-->
            <!--<el-checkbox-->
            <!--true-label="1"-->
            <!--false-label=""-->
            <!--v-model="mergeForm.zhonganAccessFlag">-->
            <!--接入对象-->
            <!--</el-checkbox>-->
            <!--</el-form-item>-->
            <!--</template>-->
        </z-form>

        <z-table
                :data="tableData"
                :columns="columns">
            <template v-slot:testSlot="{scope}">
                {{ format( scope.row.testSlot)}}
            </template>
        </z-table>

        <el-button @click="toggleTableHeader">切换表头</el-button>
        <el-button @click="showMessage">弹窗按钮</el-button>

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
                formItems,
                showTableHeader: true
            }
        },
        mounted() {
            this.getInfo()
        },
        methods: {
            showTableData(res) {
                this.tableData = res.tableData
            },
            handleClick() {
                this.mergeForm.name = 'yeyan1996'
                //Vue监听不到属性的动态添加,所以需要刷新视图
                this.mergeForm = {...this.mergeForm}
            },
            toggleTableHeader() {
                this.showTableHeader = !this.showTableHeader
                //Vue监听不到属性的动态添加,所以需要刷新视图
                //或者在配置项中声明hidden:false则不需要手动刷新视图,直接执行函数即可
                this.columns = [...this.$hideTableHeader(this.columns, "dataType", this.showTableHeader)]
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
            format(str) {
                return `处理后的${str}`
            },
            showMessage() {
                this.$selfMessage({
                    value: '这是一条消息提示',
                    duration: 2000
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    article {
        padding: 40px;
    }
</style>
