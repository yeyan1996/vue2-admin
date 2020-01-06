import { debounce as _debounce } from "lodash";
const DEFAULT_TIME = 3000;

export const debounce = {
  bind(el, { arg, modifiers, value }, vnode) {
    const isComponent = !!vnode.child;
    const duration = Number(Object.keys(modifiers)[0]) || DEFAULT_TIME;

    if (isComponent) {
      vnode.child.$on(arg, _debounce(value, duration));
    } else {
      el.addEventListener(arg, _debounce(value, duration));
    }
  }
};
