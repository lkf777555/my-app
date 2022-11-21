var express = require('express')
var router = express.Router()
var Lin = require('../model/db')
var routes = require('../utils/pathRouter')

router.get('/', function (req, res, next) {
  res.render('index', { title: '林凯丰的Express' })
})

router.get('/list', function (req, res) {
  Lin.find().then((data) => {
    res.send({ code: 1, msg: '查询成功', data })
  })
})

router.post('/login', function (req, res) {
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

router.get('/menus', function (req, res, next) {
  res.send({
    code: 1,
    msg: '获取数据成功',
    data: routes,
  })
})
module.exports = router
