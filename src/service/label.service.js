const connection = require('../app/database')

class LabelService {
  async create(name) {
    try {
      const statement = `INSERT INTO label (name) VALUES (?);`
      const res = await connection.execute(statement, [name])
      return res[0]
    } catch (error) {
      console.log(error)

    }
  }

  // 判断是否标签是否已经存在
  async isLabelExists(name){
    try {
      const statement = `SELECT * FROM label WHERE name = ?;`
      const res = await connection.execute(statement, [name])
      return res[0][0]
    } catch (error) {
      console.log(error)
    }
  }

  // 获取标签列表
  async getList(offset, limit){
    try {
      const statement = `SELECT * FROM label LIMIT ?, ?;`
      const res = await connection.execute(statement, [offset, limit])
      return res[0]
    } catch (error) {
      console.log(error)
      
    }
  }


}

module.exports = new LabelService()