// 封装注册路由方法
const fs = require('fs')

const useRouter = (app) => {
  //读取每一个文件
  fs.readdirSync(__dirname).forEach(file => {
    // 不读取 index.js 只读取路由
    if(file === 'index.js') return
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
    // console.log(file)
  })

}

module.exports = useRouter