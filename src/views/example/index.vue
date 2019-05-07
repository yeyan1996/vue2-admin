<template>
  <div id="example">
    <base-icon name="chart" @click="handleClick"></base-icon>

    <base-form
      :inline="false"
      :form-items="formItems"
      :merge-form="mergeForm"
      :api="formApi"
      @after-submit="showTableData"
    >
    </base-form>

    <base-table :data="tableData" :columns="columns">
      <template v-slot:testSlot="{ scope }">
        {{ format(scope.row.testSlot) }}
      </template>
    </base-table>

    <el-button @click="toggleTableHeader">切换表头</el-button>
    <el-button @click="showMessage">弹窗按钮</el-button>
  </div>
</template>

<script>
import { columns } from "./columns";
import { formItems } from "./formItems";
import { formApi, radioGroup, cascader } from "@/api/example";

export default {
  name: "example",
  data() {
    return {
      mergeForm: {
        zhonganAccessFlag: ""
      },
      tableData: [],
      formApi,
      columns,
      formItems,
      showTableHeader: true
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    showTableData(res) {
      this.tableData = res.tableData;
    },
    handleClick() {
      //mergeForm使用了Proxy拦截所以不需要手动刷新视图
      this.mergeForm.name = "yeyan1996";
    },
    toggleTableHeader() {
      this.showTableHeader = !this.showTableHeader;
      //columns属性使用了Proxy拦截同样不需要手动刷新视图
      this.$hideTableHeader(this.columns, "dataType", this.showTableHeader);
    },
    findItem(key) {
      return this.formItems.find(
        formItem => formItem.attrs && formItem.attrs.key === key
      );
    },
    async getInfo() {
      try {
        let [res1, res2] = await Promise.all([radioGroup(), cascader()]);
        this.findItem("asyncRadio").attrs.options = res1.options;
        this.findItem("cascader").attrs.options = res2.options;
      } catch (e) {
        console.log(e);
      }
    },
    format(str) {
      return `处理后的${str}`;
    },
    showMessage() {
      this.$selfMessage({
        value: "这是一条消息提示",
        duration: 2000
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#example {
  padding: 40px;
}
</style>
