<!--首页布局组件-->
<template>
    <article class="layout">
        <router-view></router-view>
    </article>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'

    export default {
        name: "layout",
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