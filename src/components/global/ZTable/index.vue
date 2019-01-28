<!--需要使用组件实例ref属性只能在父组件定义ref属性，使用this.$refs.<父组件ref属性名>.$children[0]获取-->
<template>
    <el-table
            :empty-text="emptyText"
            v-bind="$attrs"
            v-on="$listeners"
            :ref="_ref"
            :data="data"
            :stripe="stripe">

        <slot name="font" />

        <template v-for="(column,index) in columns" v-if="!column.hidden">

            <el-table-column
                    v-if="isCommonTableColumn(column)"
                    :key="index"
                    v-bind="column.attrs || {}">
            </el-table-column>

            <el-table-column
                    v-else
                    :key="index"
                    v-bind="column.attrs || {}">
                <template slot-scope="scope">

                    <div v-if="column.options">
                        <span>{{value2name(scope.row[column.attrs.prop],column)}}</span>
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
                                        :class="column.attrs.class"
                                        :name="operation.svgName"
                                        @click.native="handleOperation(operation.event,scope.row)">
                                </svg-icon>
                            </el-tooltip>

                            <svg-icon
                                    v-else
                                    :key="operation.svgName"
                                    :class="column.attrs.class"
                                    :name="operation.svgName"
                                    @click.native="handleOperation(operation.event,scope.row)">
                            </svg-icon>
                        </template>
                    </div>

                    <!--需要进行process处理后的字段-->
                    <div v-else-if="column.process">
                        <span>{{column.process(scope.row[column.attrs.prop])}}</span>
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
        name: "z-table",
        props: {
            columns: {
                type: Array,
                required: true
            },
            data:{
                required:true,
                default: () => []
            },
            _ref: {
                type: String
            }
        },
        methods: {
            // 是否是一个常规的table-column(有以下标签就不是常规table-column)
            isCommonTableColumn({options,operations,slot,process}) {
                return !(options || operations || slot || process)
            },
            // 找value对应的name
            value2name(value, column) {
                let option;
                let defaultOption;
                option = column.process ? this.processValue(value,column) : column.options.find(option => value === option.key)
                // 是否在没有找到name的时候使用默认name
                defaultOption = column.options.find(option => option.key === 'default')
                return option ? option.name : (defaultOption && defaultOption.name)
            },
            // 需要对tableData的字段进行预处理的情况
            processValue(value,column){
                return column.options.find(option => value == null || column.process(value) === option.key)
            },
            handleOperation(event, row) {
                this.$emit(event, row)
            },
        },
        computed: {
            emptyText() {
                return this.$attrs['empty-text'] || '没有符合条件的数据'
            },
            stripe() {
                return this.$attrs.stripe !== false
            }
        }
    }
</script>


