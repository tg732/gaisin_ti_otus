import pkg from 'mongoose';
const { Schema } = pkg;

export const model = (mongoose) => {
  const Document = new Schema({
    name: { type: String, required: true, index: true},
    task: { type: String, required: true},
    filePath: { type: String },
  }, { autoIndex: true });

  return mongoose.model('Document', Document)
}
