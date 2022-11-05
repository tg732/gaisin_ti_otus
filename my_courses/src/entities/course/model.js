const { Schema } = require('mongoose')

module.exports = (mongoose) => {
  const Course = new Schema({
    name: { type: String, required: true, index: true},
    desc: { type: String, required: true},
  }, { autoIndex: true });

  return mongoose.model('Course', Course)
}
