const connection = require('../app/database')

class AuthService {
  // 判断用户是否有权限修改评论
  async isPermission(tableName, userId, id) {
    try {
      const statement = `SELECT * FROM ${tableName} WHERE user_id = ? AND id = ?;`
      const res = await connection.execute(statement, [userId, id])
      return res[0].length === 0 ? false: true
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new AuthService()