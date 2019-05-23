<!--函数式防抖组件-->
<script>
import debounce from "lodash/debounce"; //按需引入

export default {
  name: "base-debounce",
  functional: true,
  props: {
    duration: {
      type: Number,
      default: 500
    }
  },
  render(h, context) {
    let vnodeList = context.slots().default;
    vnodeList.forEach(vnode => {
      let listeners = vnode.componentOptions.listeners;
      if (listeners) {
        Object.keys(listeners).forEach(event => {
          listeners[event] = debounce(listeners[event], context.props.duration);
        });
      }
    });
    return vnodeList;
  }
};
</script>
