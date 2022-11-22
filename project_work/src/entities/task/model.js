import pkg from 'mongoose';
const { Schema } = pkg;

export const model = (mongoose) => {
  const Task = new Schema({
    target    : { type: String, required: true, index: true},
    head		  : { type: Schema.Types.ObjectId },
    performer	: { type: Schema.Types.ObjectId },
    date	    : { type: Date, default: Date.now },
  }, { autoIndex: true });

  return mongoose.model('Task', Task)
}
