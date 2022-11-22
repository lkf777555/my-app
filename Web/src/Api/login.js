import http from '../utils/request'

export const login = (data) => http.post('/login', data) // 登录

export const menus = () => http('/menus') // 登录

export const list = () => http('/list') // 查询

export const user = (data) => http.post('/add', data) // 添加用户
