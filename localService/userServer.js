const http = require('http');
const fs = require('fs');
const urlLib = require('url');
// post 解析请求数据
const querystring = require('querystring');

//用户信息
const users = {
  'bear': '123456'
};

// 创建服务
const server = http.createServer(function (req, res) {
  // 解决中文乱码问题
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  //解析数据
  var params = '';
  // 接收到一段数据
  req.on('data', function (data) {
    params += data;
  });
  // 接收到全部数据
  req.on('end', function () {
    const resData = urlLib.parse(req.url, true);

    const url = resData.pathname;
    const getData = resData.query;
    const postData = querystring.parse(params);

    // 接口 
    if (url == '/user') {
      if (postData.password && users[postData.user] === postData.password) { // post
        // if (getData.password && users[getData.user] === getData.password) { // get
        res.write(JSON.stringify({ ok: true, msg: '登录成功' }))
      } else {
        res.write(JSON.stringify({ ok: false, msg: '用户名或密码错误' }));
      }
      res.end();
    } else {
      //读取文件
      var file_name = 'E:/learn/node' + url;
      fs.readFile(file_name, function (err, data) {
        if (err) {
          res.write('404');
        } else {
          res.write(data);
        }
        res.end();
      });
    }
  });
});

// 监听端口
server.listen(8080);