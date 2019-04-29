import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import store from '@/store'
import * as filters from './filters' // global filters
import "@/components/globalComponents" //导入全局组件
import '@/element/element'
import "normalize.css"
import {message} from "@/util/message"; //element的message框
import {hideTableHeader} from "@/util/hideTableHeader";
import '@/components/ZMessage' //引入自定义组件

Vue.config.productionTip = false
Vue.prototype.$message = message


//兼容一些老版本浏览器
// const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks');
// require('viewport-units-buggyfill').init({hacks});

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//添加隐藏表头的方法
Vue.prototype.$hideTableHeader = hideTableHeader

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
