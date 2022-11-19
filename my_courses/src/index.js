import express from 'express';
//const {express} = pkg;
const app = express();
import session from 'express-session'
import path from 'path'
import flash from 'connect-flash'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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


import {mongooseStart} from './db/mognoose.js'
import {register as comment} from './entities/comment/index.js'
import {register as user} from './entities/user/index.js'
import {register as login} from './entities/login/index.js'
import {register as course} from './entities/course/index.js'
import {register as exercise} from './entities/exercise/index.js'

;(async() => {
  const mongooseClient = await mongooseStart()

  comment(app, mongooseClient)
  user(app, mongooseClient)
  login(app, mongooseClient)
  course(app, mongooseClient)
  exercise(app, mongooseClient)

  app.listen(8080, (err) => {
    if (err) {
      console.error('Server started with error', err)
      
      return
    }

    console.log('Server started on 8080 port')
  })
})()
