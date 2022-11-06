const model = require('./model')

module.exports = class ExerciseInstance {
  constructor(mongoose) {
    this.mongoose = mongoose
    this.model = model(mongoose)
  }

  findOneById(id) {
    return this.model.findOne({ _id: id })
  }

  findAll(courseId) {
    return this.model.find({"course": courseId })
  }

  create(exercise) {
    const instance = new this.model(exercise)

    return instance.save()
  }

  updateOneById(id, exercise) {
    return this.model.updateOne({ _id: id }, { $set: exercise })
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id })
  }
}
