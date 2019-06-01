export interface Column {
  attrs?: Attrs; //所有传入el-table-column属性的对象
  hidden?: boolean; //显示/隐藏
  slot?: string /**插槽,特别复杂的交互通过作用域插槽交给父组件**/;
  operations?: Operations[]; //用于控制图标功能的对象
}

interface Attrs {
  prop?: string; //字段名
  label?: string;
  [propName: string]: any;
}


interface Operations {
  svgName: string; //svg的图标名
  event?: string; //触发事件名
  name?: string; //toolTip显示的中文名
  className?: string;
}
