// 对密码进行加密操作

const crypto = require('crypto');

const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  const res = md5.update(password).digest('hex')
  // console.log('哈哈哈')
  // const result = md5.update(password).digest('hex');
  return res;
}

module.exports = md5password;
