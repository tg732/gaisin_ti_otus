import CourseInstance from './instance.js'
import {courseRoutes} from './routes.js'

async function register(express, mongoose) {
  const courseInstance = new CourseInstance(mongoose)

  courseRoutes(express, courseInstance)
}

export {register}
