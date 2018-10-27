<template>
    <article class="example">
        <div>Hello world</div>
        <el-button>按钮</el-button>
        <svg-icon name="chart"></svg-icon>
        <img src="../../assets/img/correct.png" height="200" width="200"/>
    </article>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'

    export default {
        name: "index",
        data() {
            return {
                
            }
        },
        methods: {
            ...mapActions([
                
            ]),
            ...mapMutations([
                
            ])
        },
        computed: {
            ...mapState({
                
            }),
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>

</style>