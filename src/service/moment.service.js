// 发表动态将内容存储在数据库只能

// 连接数据库
const connections = require('../app/database')

// const statementConst = `
// SELECT 
//     m.id id, m.content content, m.createAt createTime, m.updateAT updateTime,
// JSON_OBJECT('id', u.id, 'name', u.name) user
// FROM moment m
// LEFT JOIN users u ON m.user_id = u.id`

class MomentService {
  // 将内容和用户 id 存储到数据库中
  async create(user_id, content) {
    // return "用户发表了评论~"
    const statement = "INSERT INTO moment (user_id, content) VALUES (?, ?);"
    const res = await connections.execute(statement, [user_id, content])
    return res[0]

  }

  // 按照 monmentId 查询动态相关信息
  async getDetail(id) {
    // 在数据库中查询此评论相关信息
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAT updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 
                'user',JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url)) 
          ),NULL)  FROM comment c LEFT JOIN  users cu ON cu.id = c.user_id WHERE c.moment_id = m.id) comments,
          
        IF(COUNT(l.id), JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name) 
          ),NULL)  labels,

        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', p.filename)) FROM picture p WHERE p.moment_id = m.id) images
      
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id

      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id

      WHERE m.id = ?;`
    const res = await connections.execute(statement, [id])
    return res[0][0]

  }

  // 获取动态列表
  async getList(offset, size){
    // 在数据库中查询评论列表
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAT updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', p.filename)) FROM picture p WHERE p.moment_id = m.id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?,?; `
    const res = await connections.execute(statement, [offset, size])
    return res[0]

  }

  // 对评论进行修改
  async updateComment(momentId, content){
    // 对数据库中的评论进行修改
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const res = await connections.execute(statement, [content, momentId])
    return res[0]

  }

  // 删除动态
  async removeComment(momentId){
    // 对数据库中的动态进行删除
    const statement = `DELETE FROM moment WHERE id = ?;`
    const res = await connections.execute(statement, [momentId])
    return res[0]
  }

  // 向 moment_label 表中添加数据
  async addLabel(momentId, labelId){
    try {
      const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
      const res = await connections.execute(statement, [momentId, labelId])
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }

  // 判断 moment_label 表中是否已经存在该数据
  async hasExists(momentId, labelId){
    try {
      const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
      const res = await connections.execute(statement, [momentId, labelId])
      return res[0].length === 0 ? false: true
    } catch (error) {
      console.log(error)
    }
  }

  // 获取文件信息
  async getFileByFileName(filename){
    try {
      const statement = `SELECT * FROM picture WHERE filename = ?;`
      const res = await connections.execute(statement, [filename])
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }



}

module.exports = new MomentService()