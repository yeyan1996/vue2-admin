import axios from 'axios'
import {BASE_URL} from '../config'
import store from '../store'
import {showFullScreenLoading} from "./loading";
import {tryHideFullScreenLoading} from "./loading";
import {Message} from "./message";


const service = axios.create({
    baseURL: BASE_URL,            //api请求的baseURL
    timeout: 1000 * 60 * 3,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
})


service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        showFullScreenLoading()
        return config;
        //请求失败的操作
    },
    error => {
        tryHideFullScreenLoading()
        console.log('axios请求失败', error)
        Message({
            message: `服务器请求失败${error.message}`,
            type: 'error'
        });
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        tryHideFullScreenLoading()
        switch (response.data.status) {
            //响应成功，但是服务器返回找不到数据
            case '0': {
                Message({
                    message: response.data.message,
                    type: 'error'
                });
                return Promise.reject(response)
            }
            //没有登录权限
            case '-1': {
                Message({
                    message: `登录失效请重新登录`,
                    type: 'error',
                });
                return Promise.reject(response)
            }
            case "1": {
                return response.data.result;
            }
            default:
                Message({
                    message: `未知错误`,
                    type: 'error'
                });
                console.log('后台返回status错误')
                return Promise.reject(response)
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break
                case 401:
                    error.message = '未授权，请登录';
                    break
                case 403:
                    error.message = '拒绝访问';
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break
                case 408:
                    error.message = '请求超时';
                    break
                case 500:
                    error.message = '服务器内部错误';
                    break
                case 501:
                    error.message = '服务未实现';
                    break
                case 502:
                    error.message = '网关错误';
                    break
                case 503:
                    error.message = '服务不可用';
                    break
                case 504:
                    error.message = '网关超时';
                    break
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break
                default:
                    break
            }
        }
        tryHideFullScreenLoading()
        Message({
            message: `服务器响应失败,错误信息: ${error.message}`,
            type: 'error'
        });
        return Promise.reject(error)
    }
)

export default service;
