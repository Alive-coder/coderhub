const connection = require('../app/database')

class FileService{

  // 将用户头像信息存储到数据库中
  async createAvatarInfo(filename, mimetype, size, userId){
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const res = await connection.execute(statement, [filename, mimetype, size, userId])
    return res[0]
  }

  // 从数据库中读取用户头像信息
  async getAvatarInfoById(userId){
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const res = await connection.execute(statement, [userId])
    return res[0]
  }

  // 将动态配图存储到数据库中
  async savePicture(filename, mimetype, size, userId, momentId){
    const statement = `INSERT INTO picture (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`
    try {
      const res = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }


}

module.exports = new FileService()