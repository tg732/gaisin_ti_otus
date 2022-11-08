import pkg from 'mongoose';
const { Schema } = pkg;

export const model = (mongoose) => {
  const Login = new Schema({
    name: { type: String, required: true, index: true},
    password: { type: String, required: true },
  }, { autoIndex: true });

  return mongoose.model('Login', Login)
}
