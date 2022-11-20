import DocumentInstance from './instance.js'
import {documentRoutes} from './routes.js'

export const register = async(express, mongoose) => {
  const documentInstance = new DocumentInstance(mongoose)

  documentRoutes(express, documentInstance)
}