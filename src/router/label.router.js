const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const {create, getList} = require('../controller/label.controller')

const labelRouter = new Router({prefix: '/label'})

// 创建标签
labelRouter.post('/', verifyAuth, create)
// 获取标签
labelRouter.get('/', getList)


module.exports = labelRouter