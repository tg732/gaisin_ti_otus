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
    //return this.model.find()
    //return this.model.find().populate('documents')

    return this.model.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "head",
          foreignField: "_id",
          as: "head_tab"
        },
      },
	  {
		$lookup: {
          from: "users",
          localField: "performer",
          foreignField: "_id",
          as: "perf_tab"
        }
	  }
      ])
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
