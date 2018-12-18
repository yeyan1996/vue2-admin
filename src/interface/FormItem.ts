interface BASIC_ITEM {
    component: string,
    attrs?: object,
    value?: string | boolean | object[] | string[] | number[],
    rules?: object[],
}

export interface FormItem {
    tag?: string,
    slot?: string
    label?: string,
    key?: string,
    value?: string | boolean | object[] | string[] | number[],
    attrs?: object,
    rules?: object[],
    getAttrs?(form:any): object
    ifRender?(form:any): boolean
}

export interface Basic {
    [propName: string]: BASIC_ITEM
}