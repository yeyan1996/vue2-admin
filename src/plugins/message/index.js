import VMessage from "../../components/VMessage";
import Vue from "vue";

//创建子组件构造器
const Ctor = Vue.extend(VMessage);

//安装plugin
export default {
  install(Vue) {
    Vue.prototype.$selfMessage = function(valueOrObj) {
      let message = new Ctor(); //每次调用selfMessage创建一个子组件的实例
      message.$mount(); //手动调用$mount生成$el属性DOM节点
      document.querySelector("body").appendChild(message.$el); //手动挂载到body中
      message.value = valueOrObj.value;
      if (valueOrObj.duration) {
        message.duration = valueOrObj.duration;
      }
      message.startTimer();
    };
  }
};
