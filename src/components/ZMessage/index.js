import selfMessage from './index.vue'
import Vue from 'vue'

const DEFAULT_TIME = 3000
//创建子组件构造器
const Ctor = Vue.extend(selfMessage)
//实例化子组件


//暴露原型方法为组件添加value和持续时间
Vue.prototype.$selfMessage = function (valueOrObj) {
    //每次调用selfMessage创建一个子组件的实例
    let message = new Ctor()
    //手动调用$mount生成$el属性DOM节点
    message.$mount()
    //手动挂载到body中
    document.querySelector("body").appendChild(message.$el)

    let time = 0
    if (typeof valueOrObj === 'string') {
        message.value = valueOrObj
        time = DEFAULT_TIME
    } else {
        message.value = valueOrObj.value
        time = valueOrObj.duration
    }
    setTimeout(() => {
        message.close()
    }, Number(time))
}
