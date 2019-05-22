import Vue from "vue";

//寻找某个符合条件的父组件
export function findComponentUpwardByProp(vm: Vue, prop: string): Vue | null {
  let res = null;
  let parent = vm.$parent;
  while (parent) {
    if (parent[prop] !== undefined) {
      res = parent;
      break;
    }
    parent = parent.$parent;
  }
  return res;
}
