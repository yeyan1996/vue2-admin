import {FormItem} from "../../interface/FormItem"

export const formItems: Array<FormItem> = [
    {
        "tag": "input",
        "key": "name",
        "value": "1123",
        itemAttrs: {
            "label": "姓名",
            class:"aaa"
        },
        "attrs": {
            placeholder: "请输入姓名",
        },
        getAttrs(Model) {    //返回一个被合并到当前attrs属性里的对象
            return Model.age === "22" ? {disabled: true} : null
        },
    },
    {
        slot: "icon"
    },
    {
        slot: "testFormItem"
    },
    {
        "tag": "input",
        "key": "age",
        itemAttrs: {
            "label": "年龄",
            "rules": [
                {required: true, message: '年龄不能为空', trigger: 'click'}
            ],
        },
        "attrs": {
            placeholder: "请输入姓名",
        },
        ifRender(Model) {    //form为ZFrom的:model对象
            return Model.hobby === "2";
        },
    },
    {
        "tag": "select",
        "key": "hobby",
        "value": "2",
        itemAttrs: {
            "label": "兴趣",
        },
        "attrs": {
            placeholder: "请输入兴趣",
            options: [
                {value: "1", label: "吃饭"},
                {value: "2", label: "睡觉"},
                {value: "3", label: "打豆豆"},
            ]
        }
    },
    {
        "tag": "date",
        "key": "date",
        "value": "2018/11/12",
        itemAttrs: {
            "label": "日期",
        },
    },
    {
        "tag": "radio",
        "value": "1",
        "key": "radio",
        itemAttrs: {
            "label": "单选框",
        },
        "attrs": {
            "options": [
                {value: "1", label: "男"},
                {value: "2", label: "女"},
            ]
        }
    },
    {
        "tag": "radio",
        "value": "1",
        "key": "asyncRadio",
        itemAttrs: {
            "label": "调用后端接口-单选框",
        },
        "attrs": {
            "options": []
        }
    },
    {
        "tag": "checkbox-group",
        "value": ["1"],
        "key": "checkboxGroup",
        itemAttrs: {
            "label": "复选框组",
        },
        "attrs": {
            "options": [
                {value: "1", label: "复选框1"},
                {value: "2", label: "复选框2"},
                {value: "3", label: "复选框3"},
            ]
        }
    },
    {
        "tag": "cascader",
        "key": "cascader",
        "value": [],
        itemAttrs: {
            "label": "级联选择器",
        },
        "attrs": {
            "options": []
        }
    },
    {
        "tag": "checkbox",
        "key": "checkbox",
        "value": true,
        itemAttrs: {
            "label": "复选框",
        },
        "attrs": {
            label: "复选框"
        }
    },
    {
        "tag": "textarea",
        "key": "textarea",
        itemAttrs: {
            "label": "文本框",
        },
    }
]
