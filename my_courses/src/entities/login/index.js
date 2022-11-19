import LoginInstance from './instance.js'
import {loginRoutes} from './routes.js'

export const register = async(express, mongoose) => {
  const userInstance = new LoginInstance(mongoose)

  loginRoutes(express, userInstance)
}
