import _debounce from "lodash/debounce";
const DEFAULT_TIME = 3000;
export const debounce = {
  bind(el, { arg, modifiers, value }) {
    let duration = Number(Object.keys(modifiers)[0]) || DEFAULT_TIME;
    el.addEventListener(arg, _debounce(value, duration));
  }
};
