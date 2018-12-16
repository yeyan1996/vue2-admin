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
        </z-form>
    </article>
</template>

<script>
    import {formItems} from "./formItems";

    export default {
        name: "index",
        data() {
            return {
                
            }
        },
        methods: {
            linkBack() {
                console.log('linkBack')
            },
        },
        computed: {
            formItems() {
                return formItems || []
            },
        },
        mounted() {

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