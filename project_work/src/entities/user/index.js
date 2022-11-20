import UserInstance from './instance.js'
import {userRoutes} from './routes.js'

export const register = async(express, mongoose) => {
  const userInstance = new UserInstance(mongoose)

  userRoutes(express, userInstance)
}
