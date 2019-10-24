const path = require("path");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const { DllPlugin } = require("webpack"); // 由于 vue-cli 内置了 webpack 所以不需要在 package.json 中声明
const { DLL_DIR } = require("./webpack.config");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    vue: ["vue"],
    vuex: ["vuex"],
    ELEMENT: ["element-ui"],
    vueRouter: ["vue-router"],
    axios: ["axios"]
  },
  output: {
    path: path.resolve(__dirname, "./.dll"),
    filename: "[name].dll.js",
    // 库全局变量的名字，如何暴露模块
    library: "[name]"
  },
  optimization: {
    minimizer: [
      // 删除类库文件中的log
      new UglifyJsWebpackPlugin({
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  },

  plugins: [
    new DllPlugin({
      //必须和全局变量即library名字相同，否则DllPlugin插件找不到第三方库
      name: "[name]",
      path: path.join(__dirname, DLL_DIR, "/[name].manifest.json")
    })
  ]
};
