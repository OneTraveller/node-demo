const express = require('express');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser');

const app = express();
app.listen(8080);

app.use(cookieSession({
  keys: ['a213fafaedfa', 'df8gffdafljkejd'],
  maxAge: 20 * 60 * 1000,   // 20分钟
}), cookieParser());

app.get('/a', (req, res) => {
  console.log(req.cookies)
  if (!req.session.view) {
    req.session.view = 1;
  } else {
    req.session.view++;
  }
  req.session.amount = 99.8;

  res.send(`欢迎你第${req.session.view}到本站，你的余额为：${req.session.amount}`)
});