const model = require('./model')

module.exports = class UserInstance {
  constructor(mongoose) {
    this.mongoose = mongoose
    this.model = model(mongoose)
  }

  findOneById(id) {
    return this.model.findOne({ _id: id })
  }

  findAll() {
    return this.model.find()
  }

  create(user) {
    const instance = new this.model(user)

    return instance.save()
  }

  updateOneById(id, user) {
    return this.model.updateOne({ _id: id }, { $set: user })
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id })
  }
}
