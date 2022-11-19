import CommentInstance from './instance.js'
import {commentRoutes} from './routes.js'

export const register = async (express, mongoose) => {
  const commentInstance = new CommentInstance(mongoose)

  commentRoutes(express, commentInstance)
}