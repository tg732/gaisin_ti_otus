import {model} from './model.js'

export default class CourseInstance {
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

  create(course) {
    const instance = new this.model(course)

    return instance.save()
  }

  updateOneById(id, course) {
    return this.model.updateOne({ _id: id }, { $set: course })
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id })
  }

  search(name) {
    return this.model.find({"name": {$regex : name} })
  }
}
