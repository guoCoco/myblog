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
  app.use(function (req, res) {
    if (!req.headersSend) {
      res.status(404).render('404')
    }
  })
  app.use(function(err, req, res, next) {
    console.log(err)
    req.flash('error', err.message)
    res.redirect('/psots')
  })
}
