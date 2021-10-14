const {isLabelExists, create} = require('../service/label.service')

// 判断需要给动态添加的标签是否存在
const verifyLabelIsExists = async (ctx, next) => {
  // 如果已经存在就直接添加，如果不存在就需要先在 label 表中创建对应的标签
  const labelArray = []
  const {labels} = ctx.request.body
  for(let name of labels){
    const isExists = await isLabelExists(name)
    const label = {name}
    // console.log(isExists)
    // 如果不存在就添加标签
    if(!isExists){
      const res = await create(name)
      label.id = res.insertId
    }else{
      // 如果已经存在了就拿到对应 label 标签的 id ，如果不存在就拿到 创建的 label 的 id
      label.id = isExists.id
      // console.log(isExists.id)
      // console.log(isExists)
    }
    labelArray.push(label)
  }
  ctx.labels = labelArray
  // console.log(ctx.labels)
  await next()
}


module.exports = {verifyLabelIsExists}