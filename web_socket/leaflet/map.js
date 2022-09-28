// создаем локальные переменные для карты и маркера
// каждый модуль имеет собственное пространство имен
var map = null
let marker = null

// функция принимает позицию - массив с широтой и долготой
// и сообщение, отображаемое над маркером (tooltip)
function getMap(position, tooltip) {
  // если карта не была инициализирована
  if (map === null) {
    // второй аргумент, принимаемый методом setView - это масштаб (zoom)
    map = L.map('map').setView(position, 15)
  } else {
    map.off();
    map.remove();
    map = L.map('map').setView(position, 15)
  }

  // что-то типа рекламы
  // без этого карта работать не будет
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  // добавляем маркер с сообщением
  L.marker(position).addTo(map).bindPopup(tooltip).openPopup()
}

// функция для отрисовки всех координат на карте
function setRoute(geojson) {
  // считываем массив координат из объекта
  coordinates = geojson.features[0].geometry.coordinates

  // отображаем ломаную из координат
  L.polyline([
    coordinates
  ]).addTo(map);
}