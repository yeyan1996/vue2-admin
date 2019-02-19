import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        global
    },
})

if (module.hot) {

    module.hot.accept([
        './modules/global',
    ], () => {

        const global = require('./modules/global').default

        // 加载新模块
        store.hotUpdate({
            modules: {
                global,
            }
        })
    })
}

export default store