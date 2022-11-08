import pkg from 'mongoose';
const { Schema } = pkg;

export const model = (mongoose) => {
  const User = new Schema({
    name: { type: String, required: true, index: true},
    age: { type: Number, min: 6, index: true },
  }, { autoIndex: true });

  return mongoose.model('User', User)
}
