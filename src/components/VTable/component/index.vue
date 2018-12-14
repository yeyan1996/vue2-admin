<template>
    <el-table
            empty-text="没有符合条件的数据"
            :stripe="$attrs.stripe !== false "
            :data="data"
            :height="$attrs.height"
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
            :border="$attrs.border"
            :max-height="$attrs['max-height']"
            :row-class-name="$attrs['row-class-name']"
    >

        <template v-for="(column,index) in columns" v-if="!column.hidden">

            <!-- 复选框 -->
            <el-table-column
                    :key="index"
                    v-if="column.type === 'selection'"
                    type="selection"
                    :label="column.label"
                    :width="column.width ">
            </el-table-column>
            <!-- 序号 -->
            <el-table-column
                    v-else-if="column.type === 'index'"
                    type="index"
                    :key="index"
                    :width="column.width"
                    :label="column.label">
            </el-table-column>

            <el-table-column
                    v-else
                    :key="index"
                    :label="column.label"
                    :width="column.width"
                    :min-width="column.minWidth">
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

        <slot></slot>

    </el-table>
</template>

<script>

    export default {
        name: "index",
        props: {
            data: {
                required: true
            },
            columns: {
                type: Array,
                required: true
            }
        },
        methods: {
            handleRowClick(row, event, column) {
                this.$emit("rowClick", row, event, column)
            },
            handleSelectionChange(selection) {
                this.$emit("selectionChange", selection)
            },
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
            console.log(this.$attrs)
        },
    }
</script>

<style lang="scss" scoped>
    .icon {
        color: $yy-color;
        margin-left: 5px;
    }
</style>
