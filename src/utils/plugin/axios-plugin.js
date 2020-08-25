import axios from 'axios'
import TokenCache from '@/utils/cache/TokenCache'
import defaultSettings from '@/config/defaultSettings'
import ProcessHelper from '@/utils/helper/ProcessHelper'
import QS from 'qs'
const rootUrl = () => {
    if (ProcessHelper.isProduction() || ProcessHelper.isPreview()) {
        return defaultSettings.publishRootUrl
    } else {
        return defaultSettings.localRootUrl
    }
}
export const Axios = axios.create({
    baseURL: rootUrl(),
    timeout: defaultSettings.apiTimeout
})
// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
    console.log(config);
    // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
    // if (config.method === 'post') {
    //     // JSON 转换为 FormData
    //     const formData = new FormData()
    //     Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
    //     config.data = formData
    // }
    //携带token
    if (TokenCache.getToken()) {
        config.headers.common['Token'] = TokenCache.getToken();
        config.headers.Authorization =TokenCache.getToken()
    }
    return config
}, error => {
    return Promise.reject(error)
})
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
    //授权失败
    if (!res.data.Success && res.data.ErrorCode == 401) {
        TokenCache.deleteToken()
        location.href = '/'
    }
    return res.data
}, error => {
    let errorMsg = ''
    if (error.message.includes('timeout')) {
        errorMsg = '请求超时!'
    } else {
        errorMsg = '请求异常!'
    }
    return Promise.resolve({ Success: false, Msg: errorMsg })
})
// 请求封装
// get请求方法
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        Axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err)
    })  
  });}
//   post请求方法
  export function post(url, params) {
    return new Promise((resolve, reject) => {
         Axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res);
        })
        .catch(err =>{
            reject(err)
        })
    });
  }
//  更新方法
  export function patch(url, params) {
    return new Promise((resolve, reject) => {
         Axios.patch(url, QS.stringify(params))
        .then(res => {
            resolve(res);
        })
        .catch(err =>{
            reject(err)
        })
    });
  }
//   删除方法
  export function del(url, params) {
    return new Promise((resolve, reject) => {
         Axios.delete(url, QS.stringify(params))
        .then(res => {
            resolve(res);
        })
        .catch(err =>{
            reject(err)
        })
    });
  }

  
export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', { value: Axios })
        Object.defineProperty(Vue.prototype, '$rootUrl', { value: rootUrl() })
    }
}