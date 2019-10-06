const http = require('http');
const myqsl = require('mysql');
const co = require('co-mysql');
const url = require('url');

// 连接到服务器
const conn = myqsl.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '20190921',
})
//co-mysql支持async/await
const db = co(conn);

// 配合http
http.createServer(async (req, res) => {
  // 解决中文乱码问题
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const { pathname, query } = url.parse(req.url, true);
  const { username, password } = query;

  if (pathname === '/reg') {
    if (username && password) {
      try {
        // 检查用户名是否用过
        const data = await db.query(`SELECT ID FROM user_table WHERE username='${username}'`);
        if (data.length > 0) {
          res.write('此用户已被占用');
        } else {
          await db.query(`INSERT INTO user_table (username, password) VALUES('${username}', '${password}')`);
          res.write('注册成功');
        }
      } catch (e) {
        res.write('数据库有错');
      }
      res.end();
    }
    return;
  }

  if (pathname === '/login') {
    if (username && password) {
      try {
        const data = await db.query(`SELECT * FROM user_table WHERE username='${username}'`);
        if (!data.length) {
          res.write('用户名不存在');
        } else if (data[0].password !== password) {
          res.write('密码不对');
        } else {
          res.write('登录成功');
        }
      } catch (e) {
        res.write('数据库有错');
      }
      res.end();
    }
    return;
  }
}).listen('8080');