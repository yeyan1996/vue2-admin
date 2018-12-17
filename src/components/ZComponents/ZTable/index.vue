<!--需要使用组件实例ref属性只能在父组件定义ref属性，使用this.$refs.<父组件ref属性名>.$children[0]获取-->
<template>
    <el-table
            empty-text="没有符合条件的数据"
            v-bind="$attrs"
            :data="data"
            v-on="$listeners"
            :stripe="$attrs.stripe!==false"
    >
        <slot name="first"></slot>

        <template v-for="(column,index) in columns" v-if="!column.hidden">
            <!-- 复选框 -->
            <el-table-column
                    v-if="column.type === 'selection'"
                    :key="index"
                    type="selection"
                    v-bind="column.attrs || {}">
            </el-table-column>
            <!-- 序号 -->
            <el-table-column
                    v-else-if="column.type === 'index'"
                    :key="index"
                    type="index"
                    v-bind="column.attrs || {}">
            </el-table-column>

            <el-table-column
                    v-else
                    :key="index"
                    v-bind="column.attrs || {}">
                <template slot-scope="scope">

                    <div v-if="column.options">
                        <span>{{key2name(scope.row[column.prop],column.options)}}</span>
                    </div>

                    <span v-else-if="column.slot">
                        <slot :name="column.slot" :scope="scope"></slot>
                    </span>

                    <div v-else-if="column.operations">
                        <svg-icon
                                v-for="operation in column.operations"
                                :key="operation.svgName"
                                class="icon"
                                :name="operation.svgName"
                                @click.native="handleOperation(operation.event,scope.row)">
                        </svg-icon>
                    </div>

                    <div v-else>
                        <span>{{scope.row[column.prop]}}</span>
                    </div>

                </template>
            </el-table-column>
        </template>

        <slot name="last"></slot>

    </el-table>
</template>

<script>
    export default {
        name: "index",
        props: {
            columns: {
                type: Array,
                required: true
            },
            data:{
                type:Array,
                required:true
            },
        },
        methods: {
            key2name(key, options) {
                let option = options.find(option => key === option.key)
                let defaultOption = options.find(option => option.key === 'default')
                return option ? option.name : (defaultOption ? defaultOption.name : null)
            },
            handleOperation(event, row) {
                this.$emit(event, row)
            },
        },
        mounted() {
        },
    }
</script>

<style lang="scss" scoped>

</style>
