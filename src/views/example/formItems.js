export var formItems = [
    {
        "tag": "input",
        "label": "姓名",
        "key": "name",
        "value": "1123",
        "attrs": {
            placeholder: "请输入姓名",
        },
        getAttrs: function (Model) {
            return Model.age === "22" ? { disabled: true } : null;
        },
    },
    {
        "slot": "icon"
    },
    {
        slot: "testFormItem"
    },
    {
        "tag": "input",
        "label": "年龄",
        "key": "age",
        "attrs": {
            placeholder: "请输入姓名",
        },
        "rules": [
            { required: true, message: '年龄不能为空', trigger: 'click' }
        ],
        ifRender: function (Model) {
            return Model.hobby === "2";
        },
    },
    {
        "tag": "select",
        "label": "兴趣",
        "key": "hobby",
        "value": "2",
        "attrs": {
            placeholder: "请输入兴趣",
            options: [
                { value: "1", label: "吃饭" },
                { value: "2", label: "睡觉" },
                { value: "3", label: "打豆豆" },
            ]
        },
        "rules": [],
    },
    {
        "tag": "date",
        "label": "日期",
        "key": "date",
        "value": "2018/11/12",
    },
    {
        "tag": "radio",
        "label": "单选框",
        "value": "1",
        "key": "radio",
        "attrs": {
            "options": [
                { value: "1", label: "男" },
                { value: "2", label: "女" },
            ]
        }
    },
    {
        "tag": "radio",
        "label": "调用后端接口-单选框",
        "value": "1",
        "key": "asyncRadio",
        "attrs": {
            "options": []
        }
    },
    {
        "tag": "checkbox-group",
        "label": "复选框组",
        "value": ["1"],
        "key": "checkboxGroup",
        "attrs": {
            "options": [
                { value: "1", label: "复选框1" },
                { value: "2", label: "复选框2" },
                { value: "3", label: "复选框3" },
            ]
        }
    },
    {
        "tag": "cascader",
        "label": "级联选择器",
        "key": "cascader",
        "value": [],
        "attrs": {
            "options": []
        }
    },
    {
        "tag": "checkbox",
        "label": "复选框",
        "key": "checkbox",
        "value": true,
        "attrs": {
            label: "复选框"
        }
    },
    {
        "tag": "textarea",
        "label": "文本框",
        "key": "textarea",
    },
    {
        "tag": "input",
        "label": "2个form-items计算生成的值",
        "key": "computedInput",
        value: 'xxx'
    }
];
//# sourceMappingURL=formItems.js.map