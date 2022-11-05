const LoginInstance = require('./instance')
const loginRoutes = require('./routes')

module.exports = {
  async register(express, mongoose) {
    const userInstance = new LoginInstance(mongoose)

    loginRoutes.register(express, userInstance)
  }
}
