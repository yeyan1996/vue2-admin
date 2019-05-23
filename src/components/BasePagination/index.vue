<!--
@prop {Number} total -总页数
@prop {Number} pageSize -每页显示多少数据,默认50
@prop {Number} currentPage -当前页数
@prop {String} [tableName] -表名，用于同一组件多张表格分页
@event {Function} currentChange -向父组件触发currentChange事件,参数为起止页数,表名
@event {Function} handleSizeChange -用户自定义每页显示多少数据
-->
<template>
  <section v-show="isShow">
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100, 250]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
    >
    </el-pagination>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "base-pagination",
  props: {
    total: {
      type: Number,
      default: 0
    },
    tableName: {
      type: String
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    isShow() {
      return this.total;
    },
    ...mapState({
      pageSize: state => state.global.pageSize
    })
  },
  watch: {
    //监听长度变化，初始化分页器
    total: {
      handler() {
        this.handleCurrentChange(1);
      },
      immediate: true
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      let startPage = (this.currentPage - 1) * this.pageSize;
      let endPage = this.currentPage * this.pageSize;
      if (this.$listeners["current-change"]) {
        this.$emit("current-change", startPage, endPage, this.tableName);
      } else {
        //减少在父组件添加监听currentChange事件的步骤,或者觉得与父组件耦合可以选择显式的声明current-change事件
        this.$parent.currentTableData = this.$parent.tableData.slice(
          startPage,
          endPage
        );
      }
    },
    handleSizeChange(val) {
      this.SAVE_PAGE_SIZE({
        pageSize: val
      });
      this.handleCurrentChange(1);
    },
    ...mapMutations(["SAVE_PAGE_SIZE"])
  }
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
}
.el-pagination {
  @include flex;
  margin-top: 20px;
}
</style>
