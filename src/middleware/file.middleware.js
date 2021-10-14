const Multer = require('koa-multer')
const Jimp = require('jimp')
const path = require('path')

const avatarUpload = Multer({
  dest: './uploads/avatar'
})

// 用户头像上传
const avatarHandle = avatarUpload.single('avatar')


const pictureUpload = Multer({
  dest: './uploads/picture'
})

// 动态配图上传
const pictureHandle = pictureUpload.array('picture')

// 对动态图片进行大小重写
const pictureResize = async (ctx, next) => {
  // 1. 获取所有的图像信息
  const files = ctx.req.files
  // 2. 对图片进行处理
  for(let file of files){
    const destPath = path.join(file.destination, file.filename)
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
    })
  }


  await next()
}

module.exports = {
  avatarHandle,
  pictureHandle,
  pictureResize
}