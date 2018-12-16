<template>
    <article id="example">
        <div class="msg">Hello world</div>
        <el-button>按钮</el-button>
        <svg-icon name="chart"></svg-icon>
        <img src="../../assets/img/correct.png" height="200" width="200"/>
        <z-form
                size="medium"
                :action="['home','login']"
                :form-items="formItems"
                _ref="homeForm"
                :inline="false"
                @afterSubmit="linkBack">
            <!--<template slot="cascader">-->
                <!--<el-cascader-->
                        <!--:options="options"-->
                        <!--v-model="selectedOptions"-->
                        <!--@change="handleChange">-->
                <!--</el-cascader>-->
            <!--</template>-->
        </z-form>
    </article>
</template>

<script>
    import {formItems} from "./formItems";
    import axios from 'axios'

    export default {
        name: "index",
        data() {
            return {
                formItems:[]
            }
        },
        methods: {
            linkBack() {
                console.log('linkBack')
            },
            findItemOptions(key) {
                return this.formItems.find(formItem => formItem.key === key).attrs.options
            },
            async getInfo() {
                let res1 = await axios.get('/mock.json')
                let res2 = await axios.get('/mock2.json')
                // let options = this.findItemOptions('asyncRadio')
                this.formItems.find(formItem => formItem.key === 'asyncRadio').attrs.options = res1.data.result.options
                this.formItems.find(formItem => formItem.key === 'cascader').attrs.options = res2.data.result.options
                this.formItems = [...this.formItems]

            },
        },
        mounted() {
           this.formItems = formItems
           this.getInfo()
        }
    }
</script>

<style lang="scss" scoped>
    article {
        padding: 40px;
    }

    .msg {
        font-size: 50px;
    }
</style>