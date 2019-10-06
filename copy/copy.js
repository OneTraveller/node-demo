const fs = require('fs');
const copiedPath = 'dist'
const targerPath = 'dist2'


function delDir (path) {
  let files = [];
  if (fs.existsSync(path)) { // 检测路径是否存在
    files = fs.readdirSync(path); // 读取目录的内容
    files.forEach((file, index) => {
      let curPath = `${path}/${file}`;
      if (fs.statSync(curPath).isDirectory()) { // 如果是目录返回 true，否则返回 false
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
  }
}

function copyDir (path) {
  let files = [];
  if (fs.existsSync(path)) { // 检测路径是否存在
    files = fs.readdirSync(path); // 读取目录的内容
    files.forEach((file, index) => {
      let curPath = `${path}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        copyDir(curPath); //递归删除文件夹
      } else {
        const cPath = curPath.substr(curPath.indexOf('/'))
        fs.copyFileSync(curPath, `${targerPath}${cPath}`);
      }
    });
  }
}

delDir(targerPath)
setTimeout(() => {
  copyDir(copiedPath)
}, 500)

