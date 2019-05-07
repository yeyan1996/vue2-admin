import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

const store = new Vuex.Store({
  modules
});

export default store;
