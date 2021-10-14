const {
  create,
  reply,
  update,
  remove,
  getCommentList
} = require('../service/comment.service')

class CommentController {
  // 对动态进行评论
  async create(ctx, next) {

    const {
      momentId,
      content
    } = ctx.request.body
    const userId = ctx.user.id
    // 将评论存储到数据库中
    const res = await create(content, userId, momentId)

    ctx.body = res
  }

  // 对评论进行评论
  async reply(ctx, next) {
    const {
      momentId,
      content
    } = ctx.request.body
    const {
      commentId
    } = ctx.params
    // console.log(commentId)
    const userId = ctx.user.id
    // 将对评论的评论存储在数据库中
    const res = await reply(content, userId, momentId, commentId)
    ctx.body = res
  }

  // 修改评论
  async update(ctx, next) {
    const {
      content
    } = ctx.request.body
    const {
      commentId
    } = ctx.params

    const res = await update(content, commentId)
    ctx.body = res
  }

  // 删除评论
  async remove(ctx, next) {
    const {
      commentId
    } = ctx.params
    const res = await remove(commentId)
    ctx.body = res
  }

  // 获取对应动态下的评论
  async list(ctx, next){
    const {momentId} = ctx.request.query
    const res = await getCommentList(momentId)
    ctx.body = res
  }

}

module.exports = new CommentController()