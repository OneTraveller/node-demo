const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/reg', (req, res, next) => {
  console.log('-------------get-------------')
  const { username, password } = req.query;
  console.log(username + " " + password);
  next();
  // res.send('get 请求成功');
})

// next
app.get('/reg', (req, res) => {
  res.send('get 请求成功(next)');
})

// 未使用中间件
/* const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/login', urlencodedParser, (req, res) => {
  console.log('-------------post-------------')
  const { username, password } = req.body;
  console.log(username + " " + password);
  res.send('post 请求成功')
}) */

// 使用中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/login', (req, res) => {
  console.log('-------------post-------------')
  const { username, password } = req.body || {};
  console.log(username + " " + password);
  res.send('post 请求成功（使用中间件）')
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))