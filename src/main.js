import Vue from "vue";
import App from "@/App";
import router from "@/router/router";
import store from "@/store";
import message from "./plugins/message";
import * as filters from "./filters"; // global filters
import * as directives from "./directives"; // global directives
import { hideTableHeader } from "util/hideTableHeader";
import "@/components"; //导入全局组件
import "@/element/element";
import "normalize.css";

Vue.config.productionTip = false;
Vue.prototype.$hideTableHeader = hideTableHeader; //添加隐藏表头的方法
Vue.use(message); //安装自定义弹框插件

//兼容一些老版本浏览器
// const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks');
// require('viewport-units-buggyfill').init({hacks});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
