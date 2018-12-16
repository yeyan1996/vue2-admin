<template>
    <el-checkbox-group
            v-bind="$attrs"
            :value="value"
            v-on="$listeners"
            @change="change">
        <el-checkbox
                v-for="item in $attrs.options"
                :key="item.value || item.label"
                :label="item.value || item.label">
            {{item.label}}
        </el-checkbox>
    </el-checkbox-group>
</template>
<script>
    export default {
        name: 'Z-checkbox-group',
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
                console.log(123,val)
                this.$emit('input', val);
            }
        },
    };
</script>
