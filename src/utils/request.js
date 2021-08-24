import axios from 'axios'
// import { Notification } from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (getToken()) {
    //   config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
     // 判断如果登录了就把token配置到axios的协议中
     const token = sessionStorage.getItem('token')
     if (token) {
         config.headers['token'] = token
     }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.data.code
    const msg = response.data.msg
    // eslint-disable-next-line no-unused-vars
    const message = response.data.message //
    if (code === 401) {
      // Notification.error({
      //   title: message || msg
      // })
      // store.dispatch('TokenExpire').then(() => {
      //   // 用户登录界面提示
      //   Cookies.set('point', 401)
      //   location.reload()
      // })
    } else if (code === 202 || code === 400 || code === 402 || code === 500) {
      // Notification.error({
      //   title: message || msg
      // })
      return Promise.reject(new Error(msg || '请求失败'))
    } else {
      return response.data
    }
  },
  error => {
    // 兼容blob下载出错json提示
    if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
      const reader = new FileReader()
      reader.readAsText(error.response.data, 'utf-8')
      reader.onload = function(e) {
        // eslint-disable-next-line no-unused-vars
        const errorMsg = JSON.parse(reader.result).message
        // Notification.error({
        //   title: errorMsg,
        //   duration: 5000
        // })
      }
    } else {
      let code = 0
      try {
        code = error.response.data.status
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          // Notification.error({
          //   title: '网络请求超时',
          //   duration: 5000
          // })
          return Promise.reject(error)
        }
      }
      console.log(code)
      if (code) {
        if (code === 401) {
          // store.dispatch('LogOut').then(() => {
          //   // 用户登录界面提示
          //   Cookies.set('point', 401)
          //   location.reload()
          // })
        } else {
          const errorMsg = error.response.data.message
          if (errorMsg !== undefined) {
            // Notification.error({
            //   title: errorMsg,
            //   duration: 5000
            // })
          }
        }
      } else {
        // Notification.error({
        //   title: '接口请求失败',
        //   duration: 5000
        // })
      }
    }
    return Promise.reject(error)
  }
)
export default service
