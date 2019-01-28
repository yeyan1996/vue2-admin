import Vue from 'vue'

const ctx = require.context('.', true, /\.vue$/)

ctx.keys().forEach(path => {
    //加载svg图片
    if(path.includes('Svg')){
        const ctx = require.context('@/icons', false, /\.svg$/)
        const requireAll = requireContext => requireContext.keys().map(requireContext)
        requireAll(ctx)
    }
    const module = ctx(path)
    /**
     * 兼容 import export 和 require module.export 两种规范
     */
    const component = module.default || module
    Vue.component(component.name, component)
})

