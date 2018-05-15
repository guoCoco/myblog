const express = require('express')
const router = express.Router()

const PostModel = require('../models/posts')
const checkLogin = require('../middlewares/check.js').checkLogin

// GET /posts 所有用户或者特定用户的文章页
router.get('/', function (req, res, next) {
  // res.render('posts')
  const author  = req.query.author
  PostModel.getPosts(author)
    .then(function (posts) {
      res.render('posts', {
        posts: posts
      })
    })
    .catch(next)
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  // 校验参数
  try {
    if (!title.length) {
      throw Error('请输入文章标题')
    }
    if (!content.length) {
      throw Error('文章内容不能为空')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }
  let post = {
    author: author,
    title: title,
    content: content
  }
  PostModel.create(post)
    .then(function (result) {
      // 此post是插入mongodb后的值，包含 _id
      post = result.ops[0]
      req.flash('success', '发表成功')
      res.redirect(`/posts/${post._id}`)
    })
    .catch(next)

})
// GET /psots/create 访问发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create')
})

// get /posts/:postId 单独一篇文章页
router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId

  Promise.all([
      PostModel.getPostById(postId), // 获取文章信息
      PostModel.incPv(postId) // pv加1
    ])
      .then(function (result) {
        const post = result[0]
        if (!post) {
          throw new Error('该文章不存在')
        }

        res.render('post', {
          post: post
        })
      })
      .catch(next)
})

// get /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  PostModel.getrawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在了')
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足')
      }
      res.render('edit', {
        post: post
      })
    })
    .catch(next)
})

// post /posts/:postId/edit 更新文章页
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('标题不能为空')
    }
    if (!content.length) {
      throw new Error('内容不能为空')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  // 参数校验通过，存储数据库
  PostModel.getrawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在')
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足')
      }
      PostModel.updatePostById(postId, {title: title, content: content})
        .then(function () {
          req.flash('success', '编辑文章成功')
          res.redirect(`/posts/${postId}`)
        })
        .catch(next)
    })
})

// get /posts/:postId/remove 更新文章页
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  PostModel.getrawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在了')
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足')
      }

      // 数据库删除操作
      PostModel.delPostById(postId)
        .then(function () {
          req.flash('success', '删除文章成功')
          // 删除成功后跳转主页
          res.redirect('/posts')
        })
        .catch(next)
    })
})

module.exports = router
