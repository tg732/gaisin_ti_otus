import express from 'express';
//const {express} = pkg;
const app = express();
import session from 'express-session'
import path from 'path'
import flash from 'connect-flash'
import { WebSocketServer } from 'ws';

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
import {register as user} from './entities/user/index.js'
import {register as login} from './entities/login/index.js'
import {register as document} from './entities/document/index.js'
import {register as task} from './entities/task/index.js'

;(async() => {
  const mongooseClient = await mongooseStart()

  user(app, mongooseClient)
  login(app, mongooseClient)
  document(app, mongooseClient)
  task(app, mongooseClient)

  app.listen(8080, (err) => {
    if (err) {
      console.error('Server started with error', err)
      
      return
    }

    console.log('Server started on 8080 port')
  })
})()

const wss = new WebSocketServer({noServer: true});

app.get('/ws', (req, res) => {
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() == 'websocket' &&
      // может быть подключён: keep-alive, Upgrade
      req.headers.connection.match(/\bupgrade\b/i)) 
  {
      wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  }
});

function onSocketConnect(ws) {
  console.log(`новое подключение`);

  ws.on('message', function(data, isBinary) {
    let message = isBinary ? data : data.toString();
    console.log(`получено сообщение:`);
    console.log(message);
    let messageObj = JSON.parse(message)
    
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(`${messageObj.message} номер ${messageObj.id}`);
      }
    });
  });

  ws.on('close', function() {
    console.log(`подключение закрыто`);
  });
}