// 对用户注册的中间件

// 错误类型
const errorType = require('../constants/error-type')
// 判断用户名是否存在
const {getUserByName} = require('../service/user.service')
// 对密码进行加密操作
const md5password = require('../utils/password-handle')

// 对用户名和密码进行筛选，不能让用户名和密码为空
const verifyUser = async (ctx, next) => {
  // 1. 获取到用户名和密码
  const {name, password} = ctx.request.body
  
  // 2. 判断用户名和密码是否为空
  if(!name || !password){
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断用户名是否已经存在
  const result = await getUserByName(name)
  // console.log(result)  
  if(result.length){
    // 用户已经存在了
    const error = new Error(errorType.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }


  await next()
}

// 对密码进行加密操作
const handlePassword = async (ctx, next) => {
  console.log('hahah')
  const {password} = ctx.request.body
  // console.log(password) 
  ctx.request.body.password = md5password(password)
  // console.log(res)
  await next()
}

module.exports = { verifyUser, handlePassword }