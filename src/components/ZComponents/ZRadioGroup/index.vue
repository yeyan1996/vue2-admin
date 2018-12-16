<template>
    <el-radio-group
            v-bind="$attrs"
            :value="value"
            v-on="$listeners"
            @change="change">
        <el-radio
                v-for="item in $attrs.options"
                :key="item.value"
                :label="item.value">
            {{item.label}}
        </el-radio>
    </el-radio-group>
</template>
<script>
    export default {
        name: 'Z-radio-group',
        // inheritAttrs: false,
        data() {
            return {
            };
        },
        props: {
            value:{
                default:''
            }
            // 单选列表
            // options: {
            //     type: Array,
            //     default: () => []
            // },
        },
        methods: {
            change(val) {
                this.$emit('input', val);
            }
        },
    };
</script>
