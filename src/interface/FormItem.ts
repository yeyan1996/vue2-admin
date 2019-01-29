interface BASIC_ITEM {
    component: string
    attrs?: object
    value?: string | boolean | object[] | string[] | number[]
    rules?: object[]
}

interface Listeners{
    [propName: string]: Function
}

export interface FormItem {
    tag?: string
    slot?: string
    key?: string
    value?: string | boolean | object[] | string[] | number[]
    itemAttrs?:object
    attrs?: object
    listeners?:Listeners //复杂的listeners建议使用插槽使得事件和事件处理程序解耦
    getAttrs?(form:any): object
    ifRender?(form:any): boolean
}

export interface Basic {
    [propName: string]: BASIC_ITEM
}