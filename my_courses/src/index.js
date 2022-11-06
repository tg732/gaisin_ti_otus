const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// login and session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'view')));
app.use(flash())


const { mognoose } = require('./db')
const comment = require('./entities/comment')
const user = require('./entities/user')
const login = require('./entities/login')
const course = require('./entities/course')
const exercise = require('./entities/exercise')

;(async() => {
  const mognooseClient = await mognoose.start()

  comment.register(app, mognooseClient)
  user.register(app, mognooseClient)
  login.register(app, mognooseClient)
  course.register(app, mognooseClient)
  exercise.register(app, mognooseClient)

  app.listen(8080, (err) => {
    if (err) {
      console.error('Server started with error', err)
      
      return
    }

    console.log('Server started on 8080 port')
  })
})()
