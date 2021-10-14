// 在 userRouter 进行操作的代码

const fs = require('fs')

// 对数据库的操作
const {create} = require('../service/user.service')
const {getAvatarInfoById} = require('../service/file.service')


class UserController{
  // 创建用户时对服务器进行的操作
  async create(ctx, next){
    // 1. 接收用户传递过来的用户名和密码
    const user = ctx.request.body
    // 2. 交给数据库进行处理（创建或返回错误）, 只有当数据库返回数据了才会返回信息给客户端
    const result = await create(user)
    
    // 3.给客户端返回信息
    ctx.body =  result

  }

  // 获取用户头像信息
  async getAvatarInfo(ctx, next){
    const {userId} = ctx.request.params
    // 1. 获取用户头像信息
    const avatarInfo = await getAvatarInfoById(userId)
    // console.log(avatarInfo)
    const { filename, mimetype} = avatarInfo[0]

    // 2. 在服务器中读取头像信息并返回
    // 告诉浏览器返回的数据时图片
    ctx.response.set('content-type', mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${filename}`)
    // ctx.body = result
  }



}

module.exports = new UserController()