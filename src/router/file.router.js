const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const {avatarHandle, pictureHandle, pictureResize} = require('../middleware/file.middleware') 
const {createAvatar, createPicture} = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

/* 对头像进行上传
  --> 我们需要先将上传的图片通过 koa-multer 保存在服务器中
  --> 再将图片信息存储在数据库中
 */
fileRouter.post('/avatar', verifyAuth, avatarHandle, createAvatar)

// 上传动态配图
fileRouter.post('/picture', verifyAuth, pictureHandle, pictureResize, createPicture)


module.exports = fileRouter