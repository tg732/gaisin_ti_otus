import mongoose from 'mongoose'

export const mongooseStart = 
  function start() {
    return mongoose.connect('mongodb://localhost:27017');
  }
