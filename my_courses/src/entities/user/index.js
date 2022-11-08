import UserInstance from './instance.js'
import {userRoutes} from './routes.js'

async function register(express, mongoose) {
  const userInstance = new UserInstance(mongoose)

  userRoutes(express, userInstance)
}

export {register}
