import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 自动注入所有 vuex 模块
const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

const store = new Vuex.Store({
  modules
});

export default store;
