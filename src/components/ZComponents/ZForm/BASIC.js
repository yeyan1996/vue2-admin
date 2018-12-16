"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
exports.basic = {
    input: {
        component: 'el-input',
        attrs: {
            placeholder: "请输入",
            clearable: true
        }
    },
    select: {
        component: 'z-select',
        attrs: {
            placeholder: "请选择",
            clearable: true
        }
    },
    date: {
        component: 'el-date-picker',
        attrs: (_a = {
                placeholder: "选择日期",
                clearable: true,
                type: "date",
                format: "yyyy/MM/dd"
            },
            _a["value-format"] = "yyyy/MM/dd",
            _a)
    },
    radio: {
        component: 'z-radio-group',
        value: [],
        attrs: {
            placeholder: "选择",
            clearable: true,
        }
    },
    "checkbox-group": {
        component: 'z-checkbox-group',
    },
    "cascader": {
        component: 'el-cascader',
        attrs: {
            placeholder: "请选择",
            clearable: true,
        }
    }
};
//# sourceMappingURL=BASIC.js.map