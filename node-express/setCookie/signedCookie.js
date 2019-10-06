const express = require('express');
const cookieParser = require('cookie-parser');

let app = express();
app.listen(8080);

app.use(cookieParser(
  'jlhhljli545ouijdlkfjdl5kjfkldjfkl45jakljfkldjf'
));

app.get('/a', (req, res) => {
  console.log('cookie', req.cookies);
  console.log('signedCookie', req.signedCookies);

  // 往浏览器写入cookie
  res.cookie('amount', 99.8, {
    // domain: 'aa.com', // 域名
    // path: '/', 
    httpOnly: true, // 设置只读
    // secure: true, // https生效 http无效
    maxAge: 7 * 86400 * 1000, // 有效期
    signed: true, // 签名cookie
  });

  res.send('ok');
})