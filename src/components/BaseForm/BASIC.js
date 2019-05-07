//所以组件继承自BASIC
export const basic = {
  input: {
    component: "el-input",
    attrs: {
      placeholder: "请输入",
      clearable: true
    }
  },
  select: {
    component: "base-select",
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
    component: "base-radio-group",
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
    component: "base-checkbox-group"
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
//# sourceMappingURL=BASIC.js.map
