const path = require("path");
const webpack = require("webpack"); // 由于 vue-cli 内置了 webpack 所以不需要在 package.json 中声明
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

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
    }),
    // 删除类库文件中的log
    new UglifyjsWebpackPlugin({
      uglifyOptions: {
        warnings: false,
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    })
  ]
};
