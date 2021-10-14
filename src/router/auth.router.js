// 用户登录接口
const Router = require('koa-router')

// 导入对接口的操作
const {login, success} = require('../controller/auth.controller')
// 导入对登录的验证操作
const {verifyLogin, verifyAuth} = require('../middleware/auth.middleware')

const authRouter = new Router()

// 验证登录接口
authRouter.post('/login', verifyLogin, login)
// 授权接口
authRouter.get('/test', verifyAuth, success)


module.exports = authRouter

