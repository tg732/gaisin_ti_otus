import {model} from './model.js'

export default class TaskInstance {
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

  create(task) {
    const instance = new this.model(task)

    return instance.save()
  }

  updateOneById(id, task) {
    return this.model.updateOne({ _id: id }, { $set: task })
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id })
  }

  search(name) {
    return this.model.find({"name": {$regex : name} })
  }
}
