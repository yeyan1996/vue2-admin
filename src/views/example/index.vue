<template>
  <div id="example">
    <div>
      <span class="svg-icon__label">svg图标</span>
      <base-icon
        name="chart"
        class="icon"
        @click="handleChangeName"
      ></base-icon>
    </div>

    <base-form
      :inline="false"
      :form-items="formItems"
      :merge-form="mergeForm"
      :api="formApi"
      @after-submit="showTableData"
    >
      <template v-slot:slotCheckBox>
        <el-checkbox v-model="mergeForm.slotCheckBox">插槽复选框1</el-checkbox>
      </template>
    </base-form>

    <base-table :data="tableData" :columns="columns">
      <template v-slot:testSlot="{ scope }">
        {{ scope.row.testSlot | format }}
      </template>
    </base-table>

    <el-button v-debounce:click.1000="handleToggleTableHeader"
      >切换表头(自定义指令防抖)</el-button
    >
    <!--函数式组件和自定义指令的区别在于-->
    <!--函数式组件可以包裹多个节点-->
    <base-throttle :duration="1000">
      <el-button @click="handleShowMessage">弹窗按钮(函数式组件节流)</el-button>
    </base-throttle>
  </div>
</template>

<script>
import { columns } from "./columns";
import { formItems } from "./formItems";
import { formApi, radioGroup, cascader } from "@/api/example";

export default {
  name: "example",
  filters: {
    format(str) {
      return `处理后的${str}`;
    }
  },
  data() {
    return {
      formApi,
      columns,
      formItems,
      mergeForm: {
        slotCheckBox: ""
      },
      tableData: [],
      showTableHeader: false
    };
  },
  async mounted() {
    await this.getInfo();
  },
  methods: {
    showTableData(res) {
      this.tableData = res.tableData;
    },
    handleChangeName() {
      //mergeForm使用了Proxy拦截所以不需要手动刷新视图
      this.mergeForm.name = "yeyan1996";
    },
    handleToggleTableHeader() {
      this.showTableHeader = !this.showTableHeader;
      //columns属性使用了Proxy拦截同样不需要手动刷新视图
      this.$hideTableHeader(this.columns, "dataType", this.showTableHeader);
    },
    handleShowMessage() {
      this.$selfMessage({
        value: "这是一条消息提示",
        duration: 2000
      });
    },
    findItem(key) {
      return this.formItems.find(
        formItem => formItem.attrs && formItem.attrs.key === key
      );
    },
    async getInfo() {
      const [res1, res2] = await Promise.all([radioGroup(), cascader()]);
      this.findItem("asyncRadio").attrs.options = res1.options;
      this.findItem("cascader").attrs.options = res2.options;
    }
  }
};
</script>

<style lang="scss" scoped>
#example {
  padding: 40px;
}

.icon {
  cursor: pointer;
}

.svg-icon__label {
  margin-right: 15px;
}

.base-table {
  margin-bottom: 25px;
}
</style>
