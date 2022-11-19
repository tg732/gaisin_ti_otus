import ExerciseInstance from './instance.js'
import {exerciseRoutes} from './routes.js'

export const register = async(express, mongoose) => {
  const exerciseInstance = new ExerciseInstance(mongoose)

  exerciseRoutes(express, exerciseInstance)
}