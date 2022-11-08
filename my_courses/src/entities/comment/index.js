import CommentInstance from './instance.js'
import {commentRoutes} from './routes.js'

async function register(express, mongoose) {
  const commentInstance = new CommentInstance(mongoose)

  commentRoutes(express, commentInstance)
}
export {register}
