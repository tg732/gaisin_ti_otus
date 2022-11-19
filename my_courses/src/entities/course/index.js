import CourseInstance from './instance.js'
import {courseRoutes} from './routes.js'

export const register = async(express, mongoose) => {
  const courseInstance = new CourseInstance(mongoose)

  courseRoutes(express, courseInstance)
}
