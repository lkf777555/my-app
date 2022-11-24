import http from '../utils/request'

export const login = (data) => http.post('/login', data) // 登录

export const menus = () => http('/menus') // 登录

export const list = (val = '') => http(`/list?val=${val}`) // 查询

export const user = (data) => http.post('/add', data) // 添加用户

export const del = (_id) => http.get(`/del?_id=${_id}`) // 删除用户

export const update = (val) => http.post('/update', val) // 更新状态

export const homelist = () => http.get('/homelist') // 图标数据
