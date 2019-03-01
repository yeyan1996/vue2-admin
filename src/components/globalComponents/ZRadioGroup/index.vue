<template>
    <el-radio-group
            v-bind="$attrs"
            :value="value"
            v-on="$listeners">
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
        name: 'z-radio-group',
        data() {
            return {
            };
        },
        props: {
            value:{
                default:''
            }
        }
    };
</script>
