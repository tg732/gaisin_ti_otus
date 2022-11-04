const model = require('./model')

module.exports = class CommentInstance {
  constructor(mongoose) {
    this.mongoose = mongoose
    this.model = model(mongoose)
  }

  create(comment) {
    const instance = new this.model(comment)

    return instance.save()
  }
  
  search(message) {
    console.log(message)
    return this.model.find({"message": {$regex : message} })
  }
}
