const express = require('express');
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const { mognoose, sequelize } = require('./db')
const comment = require('./entities/comment')
const user = require('./entities/user')

;(async() => {
  const mognooseClient = await mognoose.start()

  comment.register(app, mognooseClient)
  user.register(app, mognooseClient)

  app.listen(8080, (err) => {
    if (err) {
      console.error('Server started with error', err)
      
      return
    }

    console.log('Server started on 8080 port')
  })
})()
