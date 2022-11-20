import TaskInstance from './instance.js'
import {taskRoutes} from './routes.js'

export const register = async(express, mongoose) => {
  const taskInstance = new TaskInstance(mongoose)

  taskRoutes(express, taskInstance)
}
