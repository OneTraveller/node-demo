const crypto = require('crypto');

const hash = crypto.createHash('sha512');

// 可任意多次调用update():
hash.update('123456');

console.log(hash.digest('hex'));