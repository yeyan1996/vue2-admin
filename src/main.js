import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import * as filters from './filters' // global filters
import "@/components/globalComponents" //导入全局组件
import '@/element/element'
import "normalize.css"
import {Message} from "./util/message";

Vue.config.productionTip = false
Vue.prototype.$message = Message

//兼容一些老版本浏览器
// const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks');
// require('viewport-units-buggyfill').init({hacks});

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
