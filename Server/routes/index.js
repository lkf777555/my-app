var express = require('express')
var router = express.Router()
var Lin = require('../model/db')
var routes = require('../utils/pathRouter')

router.get('/', function (req, res, next) {
  res.render('index', { title: '林凯丰的Express' })
})
//表格数据
router.get('/api/list', function (req, res) {
  Lin.find({}, { __v: 0 }).then((data) => {
    res.send({ code: 1, msg: '查询成功', data })
  })
})
//登录
router.post('/api/login', function (req, res) {
  const user = req.body
  if (user.username == 'admin' && user.password == '123456') {
    let token = 'ey'
    for (let i = 1; i <= 32; i++) {
      const ranToken = Math.floor(Math.random() * 32.0).toString(16)
      token += ranToken
    }
    res.send({ code: 1, msg: '获取数据成功', token: token })
  } else {
    res.send({ code: 0, msg: '请检查密码是否正确' })
  }
})
//菜单
router.get('/api/menus', function (req, res) {
  res.send({
    code: 1,
    msg: '获取数据成功',
    data: routes,
  })
})
//添加用户
router.post('/api/add', function (req, res) {
  const user = req.body
  Lin.create(user)
    .then(() => {
      res.send({
        code: 1,
        msg: '添加成功',
      })
    })
    .catch(() => {
      res.send({
        code: 0,
        msg: '添加失败',
      })
    })
})
// 删除
router.get('/api/del', function (req, res) {
  const user = req.query
  Lin.remove({ _id: user._id })
    .then(() => {
      res.send({
        code: 1,
        msg: '删除成功',
      })
    })
    .catch(() => {
      res.send({
        code: 0,
        msg: '删除失败',
      })
    })
})
// 更新
router.post('/api/update', (req, res) => {
  const usetState = req.body
  Lin.updateOne({ _id: usetState._id }, { $set: usetState })
    .then(() => {
      res.send({ code: 1, msg: '更新成功' })
    })
    .catch(() => {
      res.send({ code: 0, msg: '更新失败' })
    })
})
module.exports = router
