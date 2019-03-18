import {Columns} from "../../interface/Columns";

export const columns: Columns[] = [
    {
        attrs: {
            prop: "dataType",
            label: "测试1",
            width: "200"
        },
        options: [
            {
                key: "1",
                name: "医保目录"
            },
            {
                key: "2",
                name: "医院目录"
            },
            {
                key: "3",
                name: "医保-医院映射"
            }
        ]
    },
    {
        attrs: {
            prop: "infoType",
            label: "测试2",
            width: "200",
            formatter: row => row.callStatus.trim()
        },
        options: [
            {
                key: "1",
                name: "医疗目录"
            },
            {
                key: "2",
                name: "疾病目录"
            },
            {
                key: "3",
                name: "手术目录"
            }
        ]
    },
    {
        attrs: {
            prop: "listCat",
            label: "测试3",
            width: "200"
        },
        options: [
            {
                key: "1",
                name: "药品"
            },
            {
                key: "2",
                name: "诊疗项目"
            },
            {
                key: "3",
                name: "服务设施"
            },
            {
                key: "4",
                name: "医用材料"
            }
        ]
    },
    {
        attrs: {
            prop: "requestTime",
            label: "测试4",
            width: "200"
        }
    },
    {
        attrs: {
            prop: "callStatus",
            label: "测试5",
            "min-width": "200"
        },
        options: [
            {
                key: "1",
                name: "实行中"
            },
            {
                key: "2",
                name: "出错实行终止"
            },
            {
                key: "3",
                name: "全部数据成功拉取"
            },
            {
                key: "0",
                name: "未拉取"
            }
        ]
    },
    {
        slot: 'testSlot',
        attrs: {
            label: "测试插槽",
        }
    },
    {
        attrs: {
            label: "字段组合",
            "min-width": "200"
        },
        compose: {
            data: [
                ["callStatus"],
                [{
                attrs: {
                    prop: "infoType",
                    label: "测试2",
                    width: "200",
                    formatter: row => row.callStatus.trim()
                },
                options: [
                    {
                        key: "1",
                        name: "医疗目录"
                    },
                    {
                        key: "2",
                        name: "疾病目录"
                    },
                    {
                        key: "3",
                        name: "手术目录"
                    }
                ]
            }]
            ]
        },
    }
]
