import axios from 'axios'
import {BASE_URL} from '../config'
import Vue from 'vue'
import store from '../store'
import {showFullScreenLoading} from "./loading";
import {tryHideFullScreenLoading} from "./loading";
import {Message} from "../components/Message";

let $axios = axios.create({
    baseURL: BASE_URL,            //api请求的baseURL
    timeout: 1000 * 60 * 60 ,
    // withCredentials: true, // 允许跨域 cookie

    headers: {
        'content-type': 'application/json'
    },
    transformResponse: [function (data) {
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.warn(`JSON字符串解析错误:${e}`)
            data = {};
        }
        return data;
    }]
})


$axios.interceptors.request.use( (config)=> {
    if(config.method ==='post' &&  Object.getPrototypeOf(config.data) === Object.prototype ){
        config.data = JSON.stringify(config.data)
    }
    // 在发送请求之前做些什么
    showFullScreenLoading()

    return config;
   //请求失败的操作
}, function (error) {
    tryHideFullScreenLoading()
    console.log('axios请求失败',error)
    Message({
        showClose: true,
        message: `服务器请求失败${error.message}`,
        type: 'error'
    });
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$axios.interceptors.response.use( (response) =>{
    tryHideFullScreenLoading()
    switch (response.data.status) {
        //响应成功，但是服务器返回找不到数据
        case '0':{
            Message({
                showClose: true,
                message: response.data.msg,
                type: 'error'
            });
            // return
            return Promise.reject(response)
        }
        //没有登录权限
        case '-1':{
            Message({
                showClose: true,
                message: `登录失效请重新登录`,
                duration:1200,
                type: 'error',
            });
            return Promise.reject(response)
        }
        case "1":{
            return response;
        }
        default:
            Message({
                showClose: true,
                message: `未知错误`,
                type: 'error'
            });
            return Promise.reject(response)
    }
}, function (error) {
    console.log('axios响应失败',error)
    tryHideFullScreenLoading()
    Message({
        showClose: true,
        message: `服务器响应失败,错误信息: ${error.message}`,
        type: 'error'
    });
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default $axios;
