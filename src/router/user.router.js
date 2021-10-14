// 用户注册接口
const Router = require('koa-router')

// 导入在路由中操作的代码片段
const {create, getAvatarInfo} = require('../controller/user.controller')
// 导入对用户名和密码验证的中间件
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'})

userRouter.post('/', verifyUser,create)
// 密码加密
// userRouter.post('/', verifyUser, handlePassword, create)


// 获取用户头像信息
userRouter.get('/:userId/avatar', getAvatarInfo)


module.exports = userRouter