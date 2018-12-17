<template>
    <article id="example">
        <div class="msg">Hello world</div>
        <el-button>按钮</el-button>
        <svg-icon name="chart"></svg-icon>
        <img src="../../assets/img/correct.png" height="200" width="200"/>
        <z-form
                :action="['home','login']"
                :form-items="formItems"
                _ref="homeForm"
                :inline="false"
                @afterSubmit="linkBack">
            <template slot="icon">
                <svg-icon name="chart" @click.native="handleClick"></svg-icon>
            </template>
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
            handleClick() {
                console.log('handleClick')
                this.findItem('name').value = 'yeyan1996'
            },
            findItem(key) {
                return this.formItems.find(formItem => formItem.key === key)
            },
            async getInfo() {
                let res1 = await axios.get('/mock.json')
                let res2 = await axios.get('/mock2.json')
                this.findItem('asyncRadio').attrs.options = res1.data.result.options
                this.findItem('cascader').attrs.options = res2.data.result.options
                // this.formItems = [...this.formItems]
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