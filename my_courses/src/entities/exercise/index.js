import ExerciseInstance from './instance.js'
import {exerciseRoutes} from './routes.js'


async function register(express, mongoose) {
  const exerciseInstance = new ExerciseInstance(mongoose)

  exerciseRoutes(express, exerciseInstance)
}

export {register}