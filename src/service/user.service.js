// 在 登录时 对数据库进行操作

// 连接数据库
const connections = require('../app/database')

class UserService{
  // 创建用户时对数据库的操作
  async create(user){
    // 将用户信息存储到数据库中
    const {name, password} = user
    const statement = "INSERT INTO users (name, password) VALUES (?, ?);"
    const result = await connections.execute(statement, [name, password])
    return result[0]
  }

  // 判断用户名是否已经存在
  async getUserByName(name){
    const statement = "SELECT * FROM users WHERE name = ?;"
    const result = await connections.execute(statement, [name])
    return result[0]
  }

  // 将用户头像信息存储到用户表中
  async saveAvatarById(avartUrl, userId){
    const statement = `UPDATE users SET avart_url = ? WHERE id = ?;`
    const result = await connections.execute(statement, [avartUrl, userId])
    return result[0]

  }


}

module.exports = new UserService()