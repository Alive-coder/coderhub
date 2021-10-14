const {createAvatarInfo, savePicture} = require('../service/file.service')
const {saveAvatarById} = require('../service/user.service')
const {APP_HOST, HOST_PORT} = require('../app/config')

class FileController{

  // 上传用户头像
  async createAvatar(ctx, next){
    // 1. 获取头像信息
    const {filename, mimetype, size} = ctx.req.file
    const userId = ctx.user.id

    // 2. 将信息存储到数据库中
    const res = await createAvatarInfo(filename, mimetype, size, userId)

    // 3. 将用户头像信息存储到用户表中
    const avartUrl = `${APP_HOST}/${HOST_PORT}/users/${userId}/avatar`

    await saveAvatarById(avartUrl, userId)


    ctx.body = '上传图片成功'
  }


  // 上传动态配图
  async createPicture(ctx, next){
    // 1. 获取参数
    const files = ctx.req.files
    const userId = ctx.user.id
    const {momentId} = ctx.query

    // 2. 将信息存储到数据库中
    for(let file of files){
      const {filename, mimetype, size} = file 
      await savePicture(filename, mimetype, size, userId, momentId)
    }

    ctx.body = '上传配图成功'
  }

}

module.exports = new FileController()