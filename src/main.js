
// 导入全局 app 对象
const app = require('./app/index')
// 导入端口号
const {HOST_PORT} = require('./app/config')

require('./app/config')

app.listen(HOST_PORT, () => {
  console.log(`服务在${HOST_PORT}端口启动成功`)
})