import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {

    },
})

if (module.hot) {

    module.hot.accept([
        // './modules/login',
    ], () => {

        // const login = require('./modules/login').default

        // 加载新模块
        store.hotUpdate({
            modules: {
                // login,
            }
        })
    })
}



export default store