const { Schema } = require('mongoose')

module.exports = (mongoose) => {
  const Comment = new Schema({
    user: { type: String, required: true, index: true },
    course: { type: String, required: true, index: true },
    message: { type: String, index: true },
  }, { autoIndex: true });

  return mongoose.model('Comment', Comment)
}