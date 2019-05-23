import { Basic } from "@/interface/FormItem";

//所以组件继承自BASIC，建立映射关系
export const basic: Basic = {
  input: {
    component: "el-input",
    attrs: {
      placeholder: "请输入",
      clearable: true
    }
  },
  select: {
    component: "base-select", //自定义组件,为了在el-select添加options能够生成el-options节点
    attrs: {
      placeholder: "请选择",
      clearable: true
    }
  },
  date: {
    component: "el-date-picker",
    attrs: {
      placeholder: "选择日期",
      clearable: true,
      type: "date",
      format: "yyyy/MM/dd",
      ["value-format"]: "yyyy/MM/dd"
    }
  },
  radio: {
    component: "base-radio-group", //自定义组件,为了在el-radio-group添加options能够生成el-radio节点
    value: [],
    attrs: {
      placeholder: "选择",
      clearable: true
    }
  },
  checkbox: {
    component: "el-checkbox"
  },
  "checkbox-group": {
    component: "base-checkbox-group" //同上
  },
  cascader: {
    component: "el-cascader",
    attrs: {
      placeholder: "请选择",
      clearable: true
    }
  },
  textarea: {
    component: "el-input",
    attrs: {
      type: "textarea"
    }
  }
};
