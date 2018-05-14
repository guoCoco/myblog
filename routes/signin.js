// 登录页
const express = require('express')
const router = express.Router()
const checkNotLogin = require('../middlewares/check').checkNotLogin

// POST /signin 创建一条留言
router.get('/', checkNotLogin, function (req, res, next) {
  res.send('登录页')
})

// POST /comments 创建一条留言
router.post('/', checkNotLogin, function (req, res, next) {
  res.send('登录')
})

module.exports = router
