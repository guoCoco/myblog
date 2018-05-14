// 评论页面路由
const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// POST /comments 创建一条留言
router.post('/', checkLogin, function (req, res, next) {
  res.send('创建留言')
})

// POST /comments 创建一条留言
router.get('/:commentsId/remove', checkLogin, function (req, res, next) {
  res.send('删除留言')
})

module.exports = router
