const http = require('http');
const fs = require('fs');
const ws = new require('ws');
var express = require("express");
var app = express();
const port = 8080;

app.use(express.static(__dirname + "/leaflet"));

const wss = new ws.Server({noServer: true});

const clients = new Set();


app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

app.get('/ws', (req, res) => {
    if (req.headers.upgrade && req.headers.upgrade.toLowerCase() == 'websocket' &&
        // может быть подключён: keep-alive, Upgrade
        req.headers.connection.match(/\bupgrade\b/i)) 
    {
        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
    }
});

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
  //http.createServer(app).listen(8080);
} else {
  // для размещения на javascript.info
  log = function() {};
  // log = console.log;
  exports.accept = accept;
}


app.listen(port, () => console.log(`listening on port ${port}!`));