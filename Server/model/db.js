const mongoose = require('mongoose')
mongoose
  .connect('mongodb://127.0.0.1:27017/mylin')
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(() => {
    console.log('数据库连接失败')
  })

const linSchema = new mongoose.Schema({
  username: String,
  password: String,
  routes: Object,
})

const Lin = mongoose.model('Lin', linSchema)
module.exports = Lin
