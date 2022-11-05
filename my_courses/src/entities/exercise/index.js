const ExerciseInstance = require('./instance')
const exerciseRoutes = require('./routes')

module.exports = {
  async register(express, mongoose) {
    const exerciseInstance = new ExerciseInstance(mongoose)

    exerciseRoutes.register(express, exerciseInstance)
  }
}
