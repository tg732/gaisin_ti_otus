const { Schema } = require('mongoose')

module.exports = (mongoose) => {
  const Login = new Schema({
    name: { type: String, required: true, index: true},
    password: { type: String, required: true },
  }, { autoIndex: true });

  return mongoose.model('Login', Login)
}
