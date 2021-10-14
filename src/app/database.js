// 连接数据库
const mysql = require('mysql2')

// 导入变量
const config = require('../app/config')


const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if(err){
      // 连接失败
      console.log('数据库连接失败')
    }else{
      console.log('数据库连接成功')
    }
  })
})

module.exports = connections.promise()