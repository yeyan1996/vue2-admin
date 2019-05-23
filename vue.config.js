const { useCDN, useAnalyzer } = require("./src/config.json");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin"); //注入dll的链接库
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const IS_PRODUCTION = process.env.NODE_ENV === "production";
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

function resolve(dir) {
  return path.join(__dirname, dir);
}

const plugins = [];
//通过readdirSync分析dll目录读取文件名动态注册AddAssetHtmlWebpackPlugin和webpack.DllReferencePlugin
if (IS_PRODUCTION) {
  //开发环境会导致调试困难所以只在生产使用
  fs.readdirSync("./dll").forEach(file => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(
        new AddAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, `./dll/${file}`),
          outputPath: "dll",
          publicPath: "dll"
        })
      );
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, `./dll/${file}`)
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
      .set("@", resolve("src/"))
      .set("util", resolve("src/util"))
      .set("mixins", resolve("src/mixins"));
    config.module.rule("svg").uses.clear();
    config.module
      .rule("svg")
      .test(/\.svg$/)
      .include.add(resolve("src/icons")) //处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    config.module // typescript
      .rule("ts")
      .test(/\.ts$/)
      .exclude.add(resolve("./node_modules"))
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .end();
    // 修改images loader 添加svg处理
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve("src/icons"))
      .end();
    if (IS_PRODUCTION) {
      if (useAnalyzer) {
        config.plugin("analyzer").use(BundleAnalyzerPlugin);
      }
      if (useCDN) {
        config.plugin("html").tap(args => {
          args[0].cdn = cdn;
          return args;
        });
        config.externals(externals);
      }
      config.plugin("html").tap(args => {
        args[0].minify.minifyCSS = true; //压缩html中的css
        return args;
      });
      //gzip需要nginx进行配合
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
        new UglifyjsWebpackPlugin({
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
    plugins,
    // 添加 ts 的后缀
    resolve: {
      extensions: [".vue", ".js", ".ts"]
    }
  },

  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/style/index.scss";`
      }
    }
  },
  devServer: {
    host: "0.0.0.0",
    overlay: true,
    port: 8070,
    open: true
  }
};
