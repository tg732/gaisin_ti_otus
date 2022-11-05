const model = require('./model')

module.exports = class LoginInstance {
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

  create(login) {
    const instance = new this.model(login)

    return instance.save()
  }

  updateOneById(id, login) {
    return this.model.updateOne({ _id: id }, { $set: login })
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id })
  }
}
