export interface Columns {
    attrs?: Attrs, //所有传入el-table-column属性的对象
    type?:string, //  传入el-table-column节点的type属性(复选框/序号)
    slot?:string, /**插槽,特别复杂的交互通过作用域插槽交给父组件**/
    prop?:string, //字段名
    options?: Options[], //用于key2name的对象
    operations?:Operations[],  //用于控制图标功能的对象
}

interface Attrs {
    label: string,
    [ propName : string ] : any
}

interface Options {
    key: string | number, //字段名
    name: string //中文名
}

interface Operations{
    svgName:string,  //svg的图标名
    event?:string, //触发事件名
    name?:string //toolTip显示的中文名
}