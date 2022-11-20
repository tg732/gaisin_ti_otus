import pkg from 'mongoose';
const { Schema } = pkg;

export const model = (mongoose) => {
  const User = new Schema({
    login     : { type: String, required: true, index: true },
    password  : { type: String, required: true },
    //email		  : { type: String, required: true },
    isHead		: { type: Boolean } 
  }, { autoIndex: true });

  return mongoose.model('User', User)
}
