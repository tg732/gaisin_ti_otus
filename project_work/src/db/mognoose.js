import mongoose from 'mongoose'

export const mongooseStart = () =>
{
  return mongoose.connect('mongodb://localhost:27017');
}
