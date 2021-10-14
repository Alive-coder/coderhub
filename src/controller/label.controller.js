const {create, getList} = require('../service/label.service')

class LabelController{

  // 创建标签
  async create(ctx, next){
    const {name} = ctx.request.body
    const res = await create(name)
    ctx.body = res
  }

  // 获取标签列表
  async getList(ctx, body){
    const {offset, limit} = ctx.request.query
    const res = await getList(offset, limit)
    ctx.body = res
  }
}

module.exports = new LabelController()