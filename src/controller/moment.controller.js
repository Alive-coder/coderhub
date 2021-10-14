const fs = require('fs')

const {
  create,
  getDetail,
  getList,
  updateComment,
  removeComment,
  addLabel,
  hasExists,
  getFileByFileName
} = require('../service/moment.service')

class MomentController {
  // 发表评论
  async create(ctx, next) {
    // ctx.body = '发表动态成功'
    // 1.获取到用户 id 以及发表的内容
    const user_id = ctx.user.id
    const {
      content
    } = ctx.request.body

    // 2. 将 user_id 和 content 存储到数据库中
    const res = await create(user_id, content)
    ctx.body = res

  }

  // 获取单条评论
  async detail(ctx, next) {
    // 1. 获取传递过来的 momentId
    const momentId = ctx.params.momentId

    // 2. 从数据库中查询到此评论相关的信息
    const res = await getDetail(momentId)
    ctx.body = res

  }

  // 获取多条动态
  async list(ctx, next) {
    // 1. 获取 偏移量和 数据量
    const {
      offset,
      size
    } = ctx.query

    // 2. 在数据库中查询评论列表
    const res = await getList(offset, size)
    ctx.body = res
  }

  // 更新评论
  async update(ctx, next) {
    /* 1. 先验证用户身份
      2. 在验证用户是否有权限修改（只能修改自己发表的评论） 
      3. 对数据库中的评论进行查找之后再修改
     */
    const {
      momentId
    } = ctx.params
    const {
      content
    } = ctx.request.body
    const res = await updateComment(momentId, content)
    // console.log(ctx.user.id)
    ctx.body = res
  }

  // 修改动态
  async remove(ctx, next) {

    const {
      momentId
    } = ctx.params
    const res = await removeComment(momentId)
    ctx.body = res
    // ctx.body = '删除动态'
  }

  // 向动态添加标签
  async addLabel(ctx, next) {
    const {
      labels
    } = ctx
    const {
      momentId
    } = ctx.request.params
    // console.log(labels)
    // 向数据库中添加关系表内容
    for (let label of labels) {
      const labelId = label.id
      // 如果在 moment_label 表中已经存在就不需要添加数据，只有不存在才需要添加
      const isExists = await hasExists(momentId, labelId)
      if (!isExists) {
        await addLabel(momentId, labelId)
      }
    }
    ctx.body = '添加标签成功'
  }

  // 提供获取动态配图接口
  async getImageByFileName(ctx, next){
    let {filename} = ctx.params
    // 1. 获取文件类型
    const res = await getFileByFileName(filename)
    // 2. 读取文件
    const {type} = ctx.query
    const types = ['small', 'middle', 'large']
    if(types.some(item => item === type)){
      filename = filename + '-' + type
    }
    
    ctx.response.set('content-type', res.mimetype)

    ctx.body = fs.createReadStream(`./uploads/picture/${filename}`)
  }

}

module.exports = new MomentController()