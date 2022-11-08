import LoginInstance from './instance.js'
import {loginRoutes} from './routes.js'


async function register(express, mongoose) {
  const userInstance = new LoginInstance(mongoose)

  loginRoutes(express, userInstance)
}

export {register}
