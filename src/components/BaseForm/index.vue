<template>
  <el-form
    class="base-form"
    v-bind="$attrs"
    :model="Model"
    :ref="form"
    :api="api"
    :show-message="showMessage"
    :status-icon="statusIcon"
    :inline="inline"
  >
    <template v-for="(item, index) in _formItems">
      <el-form-item
        :key="index + item.attrs.key"
        v-if="item._ifRender"
        :class="item.itemAttrs.className"
        v-bind="item.itemAttrs || {}"
        :prop="item.attrs.key"
      >
        <!--将表单内部的数据通过作用域插槽传给外部-->
        <slot v-if="item.slot" :name="item.slot" :scope="Model" />
        <component
          v-else
          :is="item.tag"
          :class="item.itemAttrs.className"
          v-model="Model[item.attrs.key]"
          v-bind="item.attrs || {}"
          v-on="item.listeners || {}"
        />
      </el-form-item>
    </template>

    <el-form-item v-if="submit || reset">
      <el-button @click="handleSubmit" v-if="submit">{{
        $attrs.submitContext || "搜索"
      }}</el-button>
      <el-button @click="handleReset" v-if="reset">{{
        $attrs.resetContext || "重置"
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { basic } from "./basic";
import { proxyProp } from "../../util/proxyProp";
import { findComponentUpwardByProp } from "../../util/findComponents";

const form = Symbol("form"); //保证每个实例有独一无二的标志位

export default {
  name: "base-form",
  props: {
    formItems: {
      type: Array,
      required: true
    },
    submit: {
      type: Boolean,
      default: true
    },
    reset: {
      type: Boolean,
      default: true
    },
    //接口函数
    api: {
      type: Function,
      required: true
    },
    //传入mergeForm允许父组件修改内部Model对象
    mergeForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      Model: {},
      originModel: {},
      form
    };
  },
  computed: {
    //根据formItem计算出实际需要让页面渲染的真正的_formItem数据
    _formItems() {
      //this.Model中的值改变触发computed
      let _formItems = [];
      _formItems = this.formItems.map(item =>
        this.computeFormItem(item, this.Model)
      );
      return _formItems;
    },
    showMessage() {
      return this.$attrs["show-message"] !== false;
    },
    statusIcon() {
      return this.$attrs["status-icon"] !== false;
    },
    inline() {
      return this.$attrs.inline !== false;
    }
  },
  watch: {
    //使用watch观察父组件传入的formItems,初始化Model对象(只调用一次)
    formItems: {
      handler() {
        this.formItems.forEach(formItem => {
          if (!formItem.attrs || !formItem.attrs.key) return; //跳过没有key的属性(插槽)
          this.$set(
            this.Model,
            formItem.attrs.key,
            formItem.attrs.value ? formItem.attrs.value : ""
          );
        });
        this.originModel = JSON.parse(JSON.stringify(this.Model));
      },
      deep: true,
      immediate: true
    },
    mergeForm: {
      handler() {
        this.mergeModel();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    //代理父组件的mergeForm属性
    let parentComponent = findComponentUpwardByProp(this, "mergeForm");
    if (parentComponent) {
      parentComponent.mergeForm = proxyProp(parentComponent.mergeForm);
    } else {
      throw new Error("can not find parentComponent");
    }
    //mounted钩子中formItems是空数组,所以不在mounted里面操作formItems
  },
  methods: {
    computeFormItem(formItem, Model) {
      const item = { ...formItem };
      // 表单控件的类型
      let tag = item.tag || "input";
      // 对应到组件映射表
      let basicItem = basic[tag];
      item.tag = basicItem.component;
      //继承基类的属性
      item.attrs = Object.assign({}, basicItem.attrs, item.attrs);
      // 获取动态 Attributes
      if (item.getAttrs)
        item.attrs = Object.assign(item.attrs, item.getAttrs(Model));
      // 条件渲染
      item._ifRender = item.ifRender ? item.ifRender(Model) : true;
      // 防止表单提交时存在多余 key
      if (!item._ifRender) {
        delete Model[item.attrs.key];
      }
      // form-item 配置
      return item;
    },
    mergeModel() {
      Object.assign(this.Model, this.mergeForm);
    },

    //提交按钮
    handleSubmit() {
      this.$refs[form].validate(async valid => {
        if (valid) {
          let res = await this.api(this.Model);
          this.$emit("after-submit", res);
        }
      });
    },
    handleReset() {
      this.Model = JSON.parse(JSON.stringify(this.originModel));
    }
  }
};
</script>
