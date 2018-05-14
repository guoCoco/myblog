// const express = require('express')
// const router = express.Router()

// router.get('/', function(req, res) {
// 	res.send('hello, express')
// })

// module.exports = router
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('posts')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use('/comments', require('./comments'))
}
