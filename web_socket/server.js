/**
Перед запуском:
> npm install ws
Далее:
> node server.js
> откройте http://localhost:8080 в вашем браузере
*/

const http = require('http');
const fs = require('fs');
const ws = new require('ws');
var express = require("express");
var app = express();
app.use(express.static(__dirname + "/leaflet"));
//app.set('views', __dirname)
//app.set('view engine', 'html')


const wss = new ws.Server({noServer: true});

const clients = new Set();

function accept(req, res) {

  if (req.url == '/ws' && req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() == 'websocket' &&
      // может быть подключён: keep-alive, Upgrade
      req.headers.connection.match(/\bupgrade\b/i)) 
  {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == '/') { // index.html
    fs.createReadStream('./index.html').pipe(res);
    //res.render('index')
  } else { // страница не найдена
    res.writeHead(404);
    res.end();
  }
}

app.get('/', (req, res) => {
  res.render('index')
})

let messages = []
function onSocketConnect(ws) {
  clients.add(ws);
  log(`новое подключение`);

  for (const message of messages) {
    ws.send(message);
  }

  ws.on('message', function(data, isBinary) {
    let message = isBinary ? data : data.toString();
    log(`получено сообщение: ${message}`);

    message = message.slice(0, 50); // максимальная длина сообщения 50

    messages.push(message);
    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    log(`подключение закрыто`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  http.createServer(app).listen(8080);
} else {
  // для размещения на javascript.info
  log = function() {};
  // log = console.log;
  exports.accept = accept;
}