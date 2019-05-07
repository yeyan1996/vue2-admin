const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vue: ["vue"],
    vuex: ["vuex"],
    ELEMENT: ["element-ui"],
    vueRouter: ["vue-router"],
    axios: ["axios"]
  },
  output: {
    path: path.resolve(__dirname, "./dll"),
    filename: "[name].dll.js",
    // 库全局变量的名字，如何暴露模块(这里即vendors)
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      //必须和全局变量即library名字相同，否则DllPlugin插件找不到第三方库
      name: "[name]",
      path: path.resolve(__dirname, "./dll/[name].manifest.json")
    })
  ]
};
