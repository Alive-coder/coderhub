const connection = require('../app/database')

class CommentService {
  // 对动态进行评论
  async create(content, userId, momentId) {
    try {
      const statement = `INSERT INTO comment (content, user_id, moment_id) VALUES (?, ?, ?);`
      const res = await connection.execute(statement, [content, userId, momentId])
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }

  // 对评论进行评论
  async reply(content, userId, momentId, commentId) {
    try {
      const statement = `INSERT INTO comment (content, user_id, moment_id, comment_id) VALUES (?, ?, ?, ?);`
      const res = await connection.execute(statement, [content, userId, momentId, commentId])
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }

  // 对评论进行修改
  async update(content, commentId){
    try {
      const statement = `UPDATE comment SET content = ? WHERE id = ?;`
      const res = await connection.execute(statement, [content, commentId])
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }

  // 对评论进行删除
  async remove(commentId){
    try {
      const statement = `DELETE FROM comment WHERE id = ?;`
      const res = await connection.execute(statement, [commentId])
      return res[0]
    } catch (error) {
      console.log(error)
      
    }
  }

  // 对应的动态的评论
async getCommentList(momentId){
  try {
    const statement = `
    SELECT c.id ,c.content,  c.comment_id commentId, c.createAt createTime, 
    JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM comment c
    LEFT JOIN users u ON u.id = c.user_id
    WHERE moment_id = 5;`
    const res = await connection.execute(statement, [momentId])
    return res[0]
  } catch (error) {
    console.log(error)
  }
}



}

module.exports = new CommentService()