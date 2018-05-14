const express = require('express'); // 引入 express
const app = express();
// 引入路由模块
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

// app.get('/', function(req, res) {
// 	res.send('hello, express');
// });
// :name 起了占位符的作用，这个占位符的名字是 name , 可以通过req.params.name获取
/*
req的属性：
req.query: 解析后的url中的querystring,如?name=guokeke, req.query的值为{name： 'guokeke'}
req.params: 解析url的占位符，如： /:name, 访问/guokeke,req.params的值为： {name: 'guokeke'}
req.body: 解析后请求体，使用相关的模块，如body-parser, 请求体为{name: 'guokeke'}, req.body的值为： {name: 'guokeke'}
*/ 
// app.get('/users/:name', function(req, res) {
// 	res.send('hello,' + req.params.name)
// })

// 改造如下
app.use('/', indexRouter)
app.use('/users', userRouter)


app.listen(3000)