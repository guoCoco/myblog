// 退出登录
const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// POST /signin 创建一条留言
router.get('/', checkLogin, function (req, res, next) {
  res.send('登出')
})

module.exports = router
