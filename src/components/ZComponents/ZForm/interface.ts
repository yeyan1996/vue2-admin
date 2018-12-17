export interface FormItem {
    tag?: string,
    slot?: string
    label?: string,
    key?: string,
    value?: string | boolean | any[],
    attrs?: object,
    rules?: object[],
    getAttrs?(form): object
    ifRender?(form): boolean
}

export interface BASIC_ITEM {
    component: string,
    attrs?: object,
    value?: string | boolean | any[],
    rules?: object[],
}

export interface Basic {
    [propName: string]: BASIC_ITEM
}