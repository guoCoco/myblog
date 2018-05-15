// 留言部分数据库操作
const marked = require('marked')
const Comment = require('../lib/mongo').Comment

// 将comment 的 content 从 markdown 转化成 html
Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map(function (comment) {
      comment.content = marked(comment.content)
      return comment
    })
  }
})

// 定义Comment 集合 的操作方法
module.exports = {
  // 创建一个留言
  create: function create (comment) {
    return Comment.create(comment).exec()
  },

  // 通过留言 id 获取一个留言
  getCommentById: function (commentId) {
    return Comment.findOne({_id: commentId}).exec()
  },

  // 通过留言id 删除一个留言
  delCommentById: function (commentId) {
    return Comment.deleteOne({_id: commentId}).exec()
  },

  // 通过文章id 删除该文章下的所有的留言
  delCommentByPostId: function (postId) {
    return Comment.deleteMany({postId: postId}).exec()
  },

  // 通过文章id 获取该文章下的所有留言，按留言时间升序
  getComments: function (postId) {
    return Comment
      .find({postId: postId})
      .populate({path: 'author', model: 'User'})
      .sort({_id: 1})
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // 通过文章id  获取该文章下的留言数
  getCommentsCount: function (postId) {
    return Comment.count({postId: postId}).exec()
  }
}
