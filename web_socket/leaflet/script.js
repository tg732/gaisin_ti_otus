// находим кнопку и добавляем к ней обработчик
document.getElementById('my_position').onclick = () => {
  // настоящая геолокация
  /*navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true
  })*/

  // имитации геолокации для изменения позиции на карте
  let lat = 54 + Math.random()
  let long = 56 + Math.random()
  let obj = {latitude: lat, longitude: long}
  // вызываем функцию отображения
  success(obj)

  // передаем координаты через сокет
  let obj_json = JSON.stringify(obj)
  socket.send(obj_json);
}

function success( coords ) {
  const { latitude, longitude } = coords
  const currentPosition = [latitude, longitude]

  // вызываем функцию, передавая ей текущую позицию и сообщение
  getMap(currentPosition, 'You are here')
}

function error({ message }) {
  console.log(message)
}

function setRouteMap(incomingMessage) {
  setRoute(incomingMessage)
}
