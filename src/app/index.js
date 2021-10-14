// 在这里只编写全局 app 代码
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');

// 导入错误处理
const errorHandle = require('../app/error-handle')

const useRouter =  require('../router/index')

const app = new Koa()

app.use(bodyParser())

// 一键注册所以路由
useRouter(app)

app.on('error', errorHandle)


module.exports = app