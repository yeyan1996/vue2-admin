<!--需要使用组件实例ref属性只能在父组件定义ref属性，使用this.$refs.<父组件ref属性名>.$children[0]获取-->
<template>
  <el-table
    v-bind="$attrs"
    v-on="$listeners"
    :data="data"
    :empty-text="emptyText"
    :stripe="stripe"
  >
    <slot name="font" />

    <template v-for="(column, index) in columns">
      <!--正常表头(不需要处理)-->

      <el-table-column
        v-if="isCommonTableColumn(column) && !column.hidden"
        :key="index"
        v-bind="column.attrs || {}"
      >
      </el-table-column>

      <el-table-column
        v-else-if="!column.hidden"
        :key="index"
        v-bind="column.attrs || {}"
      >
        <template v-slot="scope">
          <div v-if="needTransformData(column)">
            <span>{{ calculateValue(scope.row, column) }}</span>
          </div>

          <!--插槽/作用域插槽(Vue2.6+)-->
          <!--eg.   <template v-slot:testSlot="{scope}" >-->
          <span v-else-if="column.slot">
            <slot :name="column.slot" :scope="scope" />
          </span>

          <!--字段组合,拆分成多行显示-->
          <div v-else-if="column.compose">
            <div v-for="(row, rowIndex) in column.compose.data" :key="rowIndex">
              <template v-for="(col, colIndex) in row">
                <span :key="col + colIndex" v-if="colIndex !== 0">
                  {{ column.compose.separator }}
                </span>
                <span :key="calculateKey(column) + colIndex">
                  {{ calculateValue(scope.row, column, rowIndex, colIndex) }}
                </span>
              </template>
            </div>
          </div>

          <!--操作图标-->
          <div v-else-if="column.operations">
            <template v-for="operation in column.operations">
              <el-tooltip
                v-if="operation.name"
                effect="light"
                :key="operation.svgName"
                :content="operation.name"
                placement="top-end"
              >
                <base-icon
                  :key="operation.svgName"
                  :class="[column.attrs.className, operation.className]"
                  :name="operation.svgName"
                  @click.native="handleOperation(operation.event, scope.row)"
                >
                </base-icon>
              </el-tooltip>

              <base-icon
                v-else
                :key="operation.svgName"
                :class="[column.attrs.className, operation.className]"
                :name="operation.svgName"
                @click.native="handleOperation(operation.event, scope.row)"
              >
              </base-icon>
            </template>
          </div>
        </template>
      </el-table-column>
    </template>

    <slot />
  </el-table>
</template>

<script>
import { proxyProp } from "util/proxyProp";
import { findComponentUpwardByProp } from "../../util/findComponents";

export default {
  name: "base-table",
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    emptyText() {
      return this.$attrs["empty-text"] || "没有符合条件的数据";
    },
    stripe() {
      return this.$attrs.stripe !== false;
    }
  },
  mounted() {
    //代理父组件的columns属性
    let parentComponent = findComponentUpwardByProp(this, "columns");
    if (parentComponent) {
      parentComponent.columns = parentComponent.columns.map(column =>
        proxyProp(column)
      );
    } else {
      throw new Error("can not find parentComponent");
    }
  },
  methods: {
    // 是否是一个常规的table-column(有以下标签就不是常规table-column)
    isCommonTableColumn(column) {
      const specialColumnList = [
        "options",
        "operations",
        "slot",
        "formatter",
        "compose"
      ];
      return !specialColumnList.some(option => column[option]);
    },
    needTransformData(column) {
      const transformList = ["options", "formatter"];
      return !!transformList.some(option => column[option]);
    },
    //点击操作按钮触发的事件
    handleOperation(event, row) {
      this.$emit(event, row);
    },
    calculateKey(columnOrStr) {
      //compose中的data属性的数组支持传入一个字符串或者一个Columns类型的对象
      if (typeof columnOrStr === "string") return columnOrStr;
      return columnOrStr.attrs && columnOrStr.attrs.prop;
    },
    calculateValue(row, column, rowIndex, colIndex) {
      return column.compose
        ? this.calculateComposeValue(row, column, rowIndex, colIndex)
        : this.calculateCommonValue(row, column);
    },
    calculateComposeValue(row, column, rowIndex, colIndex) {
      let columnOrStr = column.compose.data[rowIndex][colIndex];
      let value = row[this.calculateKey(columnOrStr)];
      //字段组合中的某行某列仍是Columns类型
      if (typeof columnOrStr === "object") {
        value = this.processValue(
          row,
          columnOrStr,
          row[this.calculateKey(columnOrStr)]
        );
      }
      return value;
    },
    calculateCommonValue(row, column) {
      return this.processValue(row, column, row[column.attrs.prop]);
    },
    //让value经过多层处理返回一个处理后的value
    processValue(row, column, cellValue) {
      let value = cellValue;
      column.formatter && (value = this.formatterValue(row, column, cellValue));
      column.options && (value = this.value2name(value, column));
      return value;
    },
    // 使用options处理value
    value2name(value, column) {
      let option;
      let defaultOption;
      option = column.options.find(option => value === option.key);
      defaultOption = column.options.find(option => option.key === "default");
      // 是否在没有找到name的时候使用默认name
      return option ? option.name : defaultOption ? defaultOption.name : "";
    },
    //使用formatter处理value
    formatterValue(row, column, cellValue) {
      return column.formatter(row, column, cellValue);
    }
  }
};
</script>
