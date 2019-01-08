const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
const cdn = [
        "https://cdn.bootcss.com/vue/2.5.21/vue.min.js",
        "https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js",
        "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
        "https://cdn.bootcss.com/element-ui/2.4.11/index.js"
    ]

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    baseUrl:'',
    chainWebpack: config => {
        if(IS_PRODUCTION){
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end()
                .plugin('html')
                .tap(args => {
                    args[0].cdn = cdn;
                    return args;
                })
                //gzip需要nginx进行配合否则无法使用
                .plugin('compression')
                .use(CompressionWebpackPlugin)
                .tap(args => {
                    return [{
                        test: /\.js$|\.html$|\.css/, //匹配文件名
                        threshold: 10240, //超过10k进行压缩
                        deleteOriginalAssets: false //是否删除源文件
                    }]
                })
        }
        config.resolve.alias
            .set('@', resolve('src'))
            .set('util',resolve('src/util'))
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        config.module
            .rule('svg')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
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
    configureWebpack: config => {
        if (IS_PRODUCTION) {
            config.externals = {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'vuex':'vuex',
                'element-ui': 'ELEMENT',
            }
            config.optimization = {
                minimizer: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: {
                                warnings: false,
                                drop_console: true,//console
                                drop_debugger: false,
                                pure_funcs: ['console.log']//移除console
                            }
                        }
                    })
                ]
            }
        }
    },
    devServer: {
        host: '0.0.0.0',
        overlay:false,
        port: 8000,
    },
}
