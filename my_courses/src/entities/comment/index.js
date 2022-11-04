const CommentInstance = require('./instance')
const commentRoutes = require('./routes')

module.exports = {
  async register(express, mongoose) {
    const commentInstance = new CommentInstance(mongoose)

    commentRoutes.register(express, commentInstance)
  }
}
