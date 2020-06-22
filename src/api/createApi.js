/**
 * createApi
 *
 * @AUTHOR  yunlsp
 * @DATE    create on
 * @DESC    createApi
 */
import axios from 'axios'
import {
    msg_error,
} from '@/utils/index.js'

// axios.defaults.baseURL = ''
axios.defaults.timeout = 10 * 1000
// 跨域支持
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        // 给所有请求添加自定义header
        // config.headers['sessionId'] = ''
        return config
    },
    error => {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
axios.interceptors.response.use(
    response => {
        // Do something with response data
        // console.log(response.data)
        return response.data
    },
    error => {
        // Do something with response error
        let result = null
        if (error.response) {
            const {
                response,
            } = error
            const {
                data,
            } = response
            result = data
        } else {
            result = error
        }
        return Promise.reject(result)
    }
)

export const ajax = (function() {
    let res = {}
    const methods = ['get', 'post', 'put', 'del']
    methods.forEach(v => {
        res[v] = function(url, data=undefined) {
            let param = {
                url,
                method: v === 'del' ? 'delete' : v,
                baseURL: process.env.VUE_APP_HOST,
            }
            if (data) {
                param = ['get', 'del'].indexOf(v) === -1 ?
                    {
                        ...param,
                        data,
                    } :
                    {
                        ...param,
                        params: data,
                    }
            }
            return new Promise((resolve, reject) => {
                axios(param)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    })
    return res
})()