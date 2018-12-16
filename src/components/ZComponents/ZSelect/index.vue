<template>
    <el-select
            v-bind="$attrs"
            :value="value"
            v-on="$listeners"
            @change="change">
        <el-option
                v-for="item in $attrs.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>

    </el-select>
</template>
<script>
    export default {
        name: 'ZSelect',
        props: {
            value:{
                default:''
            }
        },
        methods: {
            change(val) {
                this.$emit('input', val);
            }
        },

    };
</script>
