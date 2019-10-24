import Vue from "vue";
import App from "@/App";
import router from "@/router/router";
import store from "@/store";
import Message from "./plugins/message";
import ErrorHandler from "./plugins/errorHandler";
import * as filters from "./filters"; // global filters
import * as directives from "./directives"; // global directives
import { hideTableHeader } from "util/hideTableHeader";
import "@/components"; //导入全局组件
import "@/element/element";
import "@/style/index.scss"
import "normalize.css";

Vue.config.productionTip = false;
Vue.prototype.$hideTableHeader = hideTableHeader; //添加隐藏表头的方法

Vue.use(Message); //安装自定义弹框插件
Vue.use(ErrorHandler); //安装错误捕获插件

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Object.keys(directives).forEach(key => Vue.directive(key, directives[key]));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
