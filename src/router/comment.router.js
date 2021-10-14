const Router = require('koa-router')

const {verifyAuth, verifyPermission} = require('../middleware/auth.middleware')
const {create, reply, update, remove, list} = require('../controller/comment.controller')


const commentRouter = new Router({prefix: '/comment'})

// 在动态下发表评论
commentRouter.post('/', verifyAuth ,create)
// 在评论下发表评论
commentRouter.post('/reply/:commentId', verifyAuth, reply)
// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)

/* 我们需要在查看动态详情时显示动态的评论信息：
 -->  我们可以分开两个接口，可以先请求动态详情接口，再请求对应动态的评论接口
 -->  我们也可以直接将全部数据写在一个接口中  
 */
commentRouter.get('/', list)



module.exports = commentRouter