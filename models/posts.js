const marked = require('marked')
const Post = require('../lib/mongo').Post

// marked: markdown 解析
// 将post 的content 从 markdown 解析成 html
Post.plugin('contentToHtml', {
  afterFind: function (posts) {
    return posts.map(function (post) {
      post.content = marked(post.content)
      return post
    })
  },
  afterFindOne: function (post) {
    if (post) {
      post.content = marked(post.content)
    }
    return post
  }
})

// 创建一篇文章
module.exports = {
  // 发表文章
  create: function create (post) {
    return  Post.create(post).exec()
  },

  // 通过id获取文章
  getPostById: function getPostById (postId) {
    return Post
      .findOne({_id: postId})
      .populate({path: 'author', model: 'User'})
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // 按照时间降序获取所有用户的文章， 或者某个特定用户的文章
  getPosts: function getPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    return Post
      .find(query)
      .populate({path: 'author', model: 'User'})
      .sort({_id: -1})
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // 通过文章id给pv加1
  incPv: function incPv (postId) {
    return Post
      .update({_id: postId}, {$inc: {pv: 1}})
      .exec()
  },

  // 通过id获取一篇原生文章（编辑文章）
  getrawPostById: function (postId) {
    return Post
      .findOne({_id: postId})
      .populate({path: 'author', model: 'User'})
      .exec()
  },

  // 通过id 更新一篇文章
  updatePostById: function (postId, data) {
    return Post.update({_id: postId}, {$set: data}).exec()
  },

  // 通过id 更新一篇文章
  delPostById: function (postId) {
    return Post.deleteOne({_id: postId}).exec()
  }
}
