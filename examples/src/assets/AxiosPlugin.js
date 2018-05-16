/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import axios from 'axios'
// import { catchError } from '@/assets/js/util.js'

const Axios = axios.create({
  timeout: 60000
})

// 暂时不启用过滤
// 添加请求拦截器
Axios.defaults.headers['Cache-Control'] = 'no-cache'
Axios.defaults.headers['Pragma'] = 'no-cache'

Axios.interceptors.request.use(config => {
  // 用户登录后,存储token，发送请求时，设置token sessionStorage.token
  // 前端Header中需要传入FrontType字段：scp-admin-ui   小区管理平台 scp-egsc-ui    小区大屏平台 egc-admin-ui 云管理平台 egc-owner-ui 云业主平台 egc-mobile-ui 云手机平台
  // if (sessionStorage.token) {
  //   config.headers.Authorization = sessionStorage.token
  // }
  // config.headers.FrontType = 'scp-admin-ui'
  config.headers.FrontType = 'scp-egsc-ui'
  return config
}, error => {
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
// Add a response interceptor
Axios.interceptors.response.use(response => {
  // console.log('success：' + JSON.stringify(response))
  // if (responseData.code === '1000') {
  //   return responseData
  // }
  return response
})

export default Axios
