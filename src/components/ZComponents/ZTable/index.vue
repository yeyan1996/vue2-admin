<!--需要使用组件实例ref属性只能在父组件定义ref属性，使用this.$refs.<父组件ref属性名>.$children[0]获取-->
<template>
    <el-table
            empty-text="没有符合条件的数据"
            v-bind="$attrs"
            v-on="$listeners"
            :ref="_ref"
            :data="data"
            :stripe="$attrs.stripe!==false">

        <slot name="font" />

        <template v-for="(column,index) in columns" v-if="!column.hidden">

            <el-table-column
                    v-if="!(column.options || column.operations || column.slot)"
                    :key="index"
                    v-bind="column.attrs || {}">
            </el-table-column>

            <el-table-column
                    v-else
                    :key="index"
                    v-bind="column.attrs || {}">
                <template slot-scope="scope">

                    <div v-if="column.options">
                        <span>{{key2name(scope.row[column.attrs.prop],column.options)}}</span>
                    </div>

                    <span v-else-if="column.slot">
                        <slot :name="column.slot" :scope="scope" />
                    </span>

                    <div v-else-if="column.operations">
                        <template v-for="operation in column.operations">
                                <el-tooltip
                                        v-if="operation.name"
                                        effect="light"
                                        :key="operation.svgName"
                                        :content="operation.name"
                                        placement="top-end">
                                    <svg-icon
                                            :key="operation.svgName"
                                            class="icon"
                                            :name="operation.svgName"
                                            @click.native="handleOperation(operation.event,scope.row)">
                                    </svg-icon>
                                </el-tooltip>

                            <svg-icon
                                    v-else
                                    :key="operation.svgName"
                                    class="icon"
                                    :name="operation.svgName"
                                    @click.native="handleOperation(operation.event,scope.row)">
                            </svg-icon>
                        </template>
                    </div>

                    <div v-else>未知表头</div>

                </template>
            </el-table-column>
        </template>

        <slot />

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
                // type:Array,
                required:true
            },
            _ref:{
                type:String
            }
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
        }
    }
</script>

