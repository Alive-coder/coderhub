const Router = require('koa-router')

const {create, detail, list, update, remove, addLabel, getImageByFileName} = require('../controller/moment.controller')
const {verifyAuth} = require('../middleware/auth.middleware')
const {verifyPermission} = require('../middleware/auth.middleware')
const {verifyLabelIsExists} = require('../middleware/label.middleware')

const momentRouter = new Router({prefix: '/moment'})

// 发表动态
momentRouter.post('/', verifyAuth, create)
// 获取多条动态
momentRouter.get('/', list)
// 获取单条动态
momentRouter.get('/:momentId', detail)
// 对动态进行更新
momentRouter.patch('/:momentId', verifyAuth,  verifyPermission, update)
// 用户删除动态
momentRouter.delete('/:momentId', verifyAuth,  verifyPermission, remove)

// 像动态添加标签
momentRouter.post('/label/:momentId', verifyAuth, verifyPermission, verifyLabelIsExists, addLabel)

// 获取动态配图图片接口
momentRouter.get('/images/:filename', getImageByFileName)

module.exports = momentRouter