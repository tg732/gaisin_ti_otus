const CourseInstance = require('./instance')
const courseRoutes = require('./routes')

module.exports = {
  async register(express, mongoose) {
    const courseInstance = new CourseInstance(mongoose)

    courseRoutes.register(express, courseInstance)
  }
}
