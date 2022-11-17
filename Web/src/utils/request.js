import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
  timeout: 2000,
})
// 请求拦截器
http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('Token')
    config.headers.Authorization = token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
http.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default http
