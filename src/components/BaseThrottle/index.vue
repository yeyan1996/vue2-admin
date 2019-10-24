<!--函数式节流组件-->
<script>
import throttle from "lodash/throttle";

export default {
  name: "base-throttle",
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
          listeners[event] = throttle(listeners[event], context.props.duration);
        });
      }
    });
    return vnodeList;
  }
};
</script>
