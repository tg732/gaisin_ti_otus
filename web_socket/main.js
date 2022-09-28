const ws = new require('ws');
var express = require("express");
var app = express();
const port = 8080;

app.use(express.static(__dirname + "/leaflet"));

const wss = new ws.Server({noServer: true});

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
      wss.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
          client.send(geojson_str);
        }
      });
    });
  });

  ws.on('close', function() {
    log(`подключение закрыто`);
  });
}

let log;
if (require.main === module) {
  log = console.log;
} else {
  log = function() {};
  exports.accept = accept;
}

app.listen(port, () => console.log(`listening on port ${port}!`));