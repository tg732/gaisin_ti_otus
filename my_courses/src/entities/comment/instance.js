import {model} from './model.js'

export default class CommentInstance {
  constructor(mongoose) {
    this.mongoose = mongoose
    this.model = model(mongoose)
  }

  create(comment) {
    const instance = new this.model(comment)

    return instance.save()
  }
  
  search(message) {
    return this.model.find({"message": {$regex : message} })
  }

  findAll() {
    return this.model.find()
  }
}
