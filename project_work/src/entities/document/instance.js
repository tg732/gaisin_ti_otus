import {model} from './model.js'

export default class DocumentInstance {
  constructor(mongoose) {
    this.mongoose = mongoose
    this.model = model(mongoose)
  }

  findOneById(id) {
    return this.model.findOne({ _id: id })
  }

  findAll(taskId) {
    return this.model.find({"task": taskId })
  }

  create(document) {
    const instance = new this.model(document)

    return instance.save()
  }

  updateOneById(id, document) {
    return this.model.updateOne({ _id: id }, { $set: document })
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id })
  }
}
