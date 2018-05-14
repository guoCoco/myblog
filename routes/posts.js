const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin

// GET /posts 所有用户或者特定用户的文章页
router.get('/', function (req, res, next) {
  res.send('主页')
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
  res.send('发表文章')
})
// GET /psots/create 访问发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.send('发表文章页')
})

// get /posts/:postId 单独一篇文章页
router.get('/:postId', function (req, res, next) {
  res.send('文章详情页面')
})

// get /posts/:postId/edit 更新文章页
router.get('/:postId/edit', function (req, res, next) {
  res.send('更新文章详情页')
})

// post /posts/:postId/edit 更新文章页
router.post('/:postId/edit', function (req, res, next) {
  res.send('更新文章')
})

// get /posts/:postId/remove 更新文章页
router.get('/:postId/remove', function (req, res, next) {
  res.send('删除文章')
})

module.exports = router
