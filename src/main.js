import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import '@/element/element'
import './icons'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
