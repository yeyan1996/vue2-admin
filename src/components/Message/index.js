//二次封装Message框,设置默认参数
import { Message as elementMessage } from 'element-ui'

export function Message(options){
    options = Object.assign({
        duration: 2000
    },options)
    elementMessage(options)
}



