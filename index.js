const express = require('express'); // 引入 express
const app = express();

app.get('/', function(req, res) {
	res.send('hello, express');
});

app.listen(3000)