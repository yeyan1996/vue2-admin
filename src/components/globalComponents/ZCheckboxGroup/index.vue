<template>
    <el-checkbox-group
            v-bind="$attrs"
            :value="value"
            v-on="$listeners"
            @change="change">
        <el-checkbox
                v-for="item in $attrs.options"
                :key="item.value || item.label"
                :disabled ="item.disabled"
                :label="item.value || item.label">
            {{item.label}}
        </el-checkbox>
    </el-checkbox-group>
</template>
<script>
    export default {
        name: 'z-checkbox-group',
        data() {
            return {
            };
        },
        props: {
            value:{
                default:()=>[]
            }
        },
        methods: {
            change(val) {
                this.$emit('input', val);
            }
        },
    };
</script>
