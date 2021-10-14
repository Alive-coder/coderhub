// 引入错误类型
const errorType = require('../constants/error-type')

const errorHandle = (error, ctx) => {
  let message, stauts
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      stauts = 400
      message = '用户名或密码不能为空~'
      break;
    case errorType.USER_ALREADY_EXISTS: 
      stauts = 409
      message = '用户名已经存在~'
      break;
    case errorType.USER_DOES_NOT_EXISTS: 
      stauts = 400
      message = '用户名不存在~'
      break;
    case errorType.PASSWORD_IS_INCORRENT: 
      stauts = 400
      message = '密码错误~'
      break;
    case errorType.UNAUTHORIZATION: 
      stauts = 401
      message = '无效token~'
      break;
    case errorType.UNPERMISSION: 
      stauts = 401
      message = '您没有该权限~'
      break;
    default:
      stauts = 404
      message = 'NOT FOUND'
      break;
  }
  ctx.body = message
  ctx.stauts = stauts
}

module.exports = errorHandle