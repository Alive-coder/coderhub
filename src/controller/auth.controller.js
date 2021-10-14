const jwt = require('jsonwebtoken')

const {PRIVATE_KEY} = require('../app/config')

class AuthController {
// 用户登录成功之后颁发 token
  async login(ctx, next){
    const {id, name} = ctx.user
    //  颁发 token
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 *24,
      algorithm: 'RS256'
    })

    ctx.body = {id, name, token}
  }

  // 当用户登录之后去访问资源时授权成功
  async success(ctx, next){
    ctx.body = '授权成功可以访问资源~'
    // ctx.body = ctx.user
  }


}

module.exports = new AuthController()