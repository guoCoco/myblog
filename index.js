const express = require('express'); // 引入 express
const path = require('path');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')

const app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views')) // 设置存放模板文件的目录
// 设置模板引擎为 ejs
app.set('view engine', 'ejs') // 设置模块引擎为 ejs, 注意这个 'view engine'不能写错

// 设置静态文件目录 app.use()主要用来加载中间件
app.use(express.static(path.join(__dirname, 'public')))
// 设置session中间件
app.use(session({
  name: config.session.key, // 设置cookie中保存 session id 字段
  secret: config.session.secret, // 设置sectet来计算hash值并存放在cookie中，使产生signedCookie防篡改
  resave: true, // 强制更新session
  saveUninitialized: false, // 设置为false.强制创建一个session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({ // 将session存到 mongodb中
    url: config.mongodb // mongodb地址
  })
}))
// flash中间件，用来显示通知
app.use(flash())

// 路由
routes(app)

 // 监听端口
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})

// app.get('/', function(req, res) {
//  res.send('hello, express');
// });
// :name 起了占位符的作用，这个占位符的名字是 name , 可以通过req.params.name获取
/*
req的属性：
req.query: 解析后的url中的querystring,如?name=guokeke, req.query的值为{name： 'guokeke'}
req.params: 解析url的占位符，如： /:name, 访问/guokeke,req.params的值为： {name: 'guokeke'}
req.body: 解析后请求体，使用相关的模块，如body-parser, 请求体为{name: 'guokeke'}, req.body的值为： {name: 'guokeke'}
*/
// app.get('/users/:name', function(req, res) {
//  res.send('hello,' + req.params.name)
// })
// app.use('/', indexRouter)
// app.use('/users', userRouter)

