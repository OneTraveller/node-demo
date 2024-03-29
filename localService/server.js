const http = require('http');
const fs = require('fs');//引入文件读取模块
const { exec } = require("child_process");
const documentRoot = 'E:/learn/node';

http.createServer(function (req, res) {
  const file = documentRoot + req.url;
  fs.readFile(file, function (err, data) {
    if (err) {
      res.write('<h1>404</h1>');
      res.end();
    } else res.end(data);
  });
}).listen(8888);

const url = 'http://127.0.0.1:8888/index.html';
// win系统：win32   mac系统：darwin
const type = process.platform === 'win32' ? 'start' : 'open';
// 自动打开浏览器
exec(`${type} ${url}`);

console.log('服务器开启中...');