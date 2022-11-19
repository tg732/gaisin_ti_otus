import pkg from 'mongoose';
const { Schema } = pkg;

export const model = (mongoose) => {
  const Exercise = new Schema({
    name: { type: String, required: true, index: true},
    desc: { type: String, required: true},
    files: { type: String },
    course: { type: String, required: true }
  }, { autoIndex: true });

  return mongoose.model('Exercise', Exercise)
}
