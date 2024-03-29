import pkg from 'mongoose';
const { Schema } = pkg;

export const model = (mongoose) => {
  const Comment = new Schema({
    user: { type: String, required: true, index: true },
    course: { type: String, required: true, index: true },
    message: { type: String, index: true },
    timestamp: { type: Date }
  }, { autoIndex: true });

  return mongoose.model('Comment', Comment)
}
