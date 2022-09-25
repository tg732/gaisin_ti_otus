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

var geojson = {
  "name":"NewFeatureType",
  "type":"FeatureCollection",
  "features":[{
      "type":"Feature",
      "geometry":{
          "type":"LineString",
          "coordinates":[]
      },
      "properties":null
  }]
};

function onSocketConnect(ws) {
  clients.add(ws);
  log(`новое подключение`);

  ws.on('message', function(data, isBinary) {
    let message = isBinary ? data : data.toString();
    log(`получено сообщение: ${message}`);
    let obj = JSON.parse(message)
    // добавляем координаты в массив geojson
    geojson.features[0].geometry.coordinates.push([obj.latitude, obj.longitude]);
    // записываем координаты в файл coord.geojson
    var fs = require('fs');
    geojson_str = JSON.stringify(geojson)
    fs.writeFile('coord.geojson', geojson_str, 'utf8', function () {
      // отправляем маршрут в виде geojson-строки на клиент
      for(let client of clients) {
        client.send(geojson_str);
      }
    });
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