// 对用户登录进行验证
const jwt = require('jsonwebtoken')

const {getUserByName} = require('../service/user.service')
const errorType = require('../constants/error-type')
const {PUBLIC_KEY} = require('../app/config')
const {isPermission} = require('../service/auth.service')

// 验证登录
const verifyLogin = async(ctx, next) => {
  // 1. 获取用户名和密码
  const {name, password} = ctx.request.body

  // 2. 判断用户名和密码是否为空
  if(!name || !password){
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断用户名是否存在
  const result = await getUserByName(name)
  const user = result[0]
  // console.log(user)
  if(!user){
    // 用户不存在
    const error = new Error(errorType.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 4. 判断密码是否正确
  const userPassword = user.password //数据库中的密码
  if(userPassword !== password){
    // 密码错误
    const error = new Error(errorType.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', error, ctx)
  }

  // 当全部验证都通过了就可以获取到 user
  ctx.user = user

  await next()
}

// 当登录成功后访问资源前的授权操作
const verifyAuth = async (ctx, next) => {

  const authorization = ctx.headers.authorization
  // 如果没有拿到 authorization 直接报错
  if(!authorization){
    const error = new Error(errorType.UNAUTHORIZATION)
    // ctx.body = '拿不到token'
    return ctx.app.emit('error', error, ctx)
  }

  const token = authorization.replace('Bearer ', '')

  try {
    const res = jwt.verify(token, PUBLIC_KEY,{
      algorithms: ['RS256']
    })
    ctx.user = res
    await next()
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }

}

// 验证用户权限
const verifyPermission = async (ctx, next) => {

  // 1. 获取到 需要验证的类型
  const [resoureKey] = Object.keys(ctx.params)
  const tableName = resoureKey.replace('Id', '')
  const userId = ctx.user.id
  const id = ctx.params[resoureKey]

  try {
    // 2. 在数据库中查询是否有这个评论
    const ispermission = await isPermission( tableName, userId, id)
    // console.log(ispermission)
    if(!ispermission) throw new Error()
    await next()
  } catch (err) {
    const error = new Error(errorType.UNPERMISSION)
    ctx.app.emit('error', error, ctx)
    return
  }

}

module.exports = {verifyLogin, verifyAuth, verifyPermission}