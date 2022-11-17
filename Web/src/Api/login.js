import http from '../utils/request'

export const login = (data) => http.post('/login', data) // 登录

export const menus = () => http('/menus') // 登录
