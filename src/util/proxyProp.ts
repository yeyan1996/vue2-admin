import Vue from "vue";
/* eslint-disable */
export function proxyProp(prop: object) {
  //使用Proxy可以拦截对象的动态生成的属性
  return new Proxy(prop, {
    set(target, key, value) {
      if (prop[key] !== value) {
        let _set = Vue.set;
        _set.call(Vue, prop, key, value);
      }
      return Reflect.set(target, key, value);
    }
  });
}
