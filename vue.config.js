const fs = require("fs");
const path = require("path");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin"); // 给 index.html 注入 dll 生成的链接库
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { useCDN } = require("./src/config.json");
const { DllReferencePlugin } = require("webpack");
const {
  DLL_DIR,
  IS_PRODUCTION,
  IS_TEST,
} = require("./webpack.config");
// 由于公有 cdn 不稳定，这里提供 cdn 的配置项但是用 DllPlugin 做替代
const cdn = [
  "https://unpkg.com/vue@2.6.9/dist/vue.min.js",
  "https://unpkg.com/vue-router@3.0.2/dist/vue-router.min.js",
  "https://unpkg.com/vuex@3.1.0/dist/vuex.min.js",
  "https://unpkg.com/element-ui@2.6.1/lib/index.js",
  "https://unpkg.com/axios@0.18.0/dist/axios.min.js",
  "https://unpkg.com/js-cookie@2.2.0/src/js.cookie.js"
];

const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  "element-ui": "ELEMENT",
  axios: "axios",
  "js-cookie": "Cookies"
};
const plugins = [];
// 通过 readdirSync 分析 .dll 目录读取文件名
// 动态注册 AddAssetHtmlWebpackPlugin 和 webpack.DllReferencePlugin
if (IS_PRODUCTION && fs.existsSync(DLL_DIR)) {
  fs.readdirSync(DLL_DIR).forEach(file => {
    if (/.*\.dll\.js$/.test(file)) {
      plugins.push(
        new AddAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, DLL_DIR, file),
          outputPath: "js", // 输出路径，相对于默认的输出路径（dist）
          publicPath: "js" // 引入文件路径
        })
      );
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new DllReferencePlugin({
          manifest: path.resolve(__dirname, DLL_DIR, file)
        })
      );
    }
  });
}
module.exports = {
  publicPath: "",
  chainWebpack: config => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力(使用在移动端)
     */
    // config.plugins.delete("prefetch").delete("preload");
    config.resolve.alias
      .set("@", path.join(__dirname, "src/"))
      .set("util", path.join(__dirname, "src/util"))
      .set("mixins", path.join(__dirname, "src/mixins"));
    config.module.rule("svg").uses.clear();
    config.module
      .rule("svg")
      .test(/\.svg$/)
      .include.add(path.join(__dirname, "src/icons")) //处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    // 修改images loader 添加svg处理
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(path.join(__dirname, "src/icons"))
      .end();
    if (IS_PRODUCTION) {
      if (useCDN) {
        config.plugin("html").tap(args => {
          args[0].cdn = cdn;
          return args;
        });
        config.externals(externals);
      }
      config.plugin("html").tap(args => {
        args[0].minify.minifyCSS = true; //压缩 index.html 中的css
        return args;
      });
      /** 注意：gzip需要nginx进行配合 */
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //超过10k进行压缩
            deleteOriginalAssets: false //是否删除源文件
          }
        ]);
      config.optimization.minimizer([
        new UglifyJsWebpackPlugin({
          // 生产环境推荐关闭 sourcemap 防止源码泄漏
          // 服务端通过前端发送的行列，根据 sourcemap 转为源文件位置
          sourceMap: IS_TEST,
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          }
        })
      ]);
    }
  },
  configureWebpack: {
    plugins
  },

  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `
        @import '~@/style/mixin.scss';
        @import "~@/style/variables.scss";
        `
      }
    }
  },
  devServer: {
    host: "0.0.0.0",
    overlay: true,
    port: 8088
  }
};
