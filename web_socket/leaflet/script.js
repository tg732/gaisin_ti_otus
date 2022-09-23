// импортируем функцию
import { getMap } from './map.js'

// находим кнопку и добавляем к ней обработчик
document.getElementById('my_position').onclick = () => {
  /*navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true
  })*/
  let lat = 54 + Math.random()
  let long = 56 + Math.random()
  success({latitude: lat, longitude: long})
}

function success( coords ) {
  const { latitude, longitude } = coords
  const currentPosition = [latitude, longitude]
  console.log(currentPosition)
  console.log(coords)
  // вызываем функцию, передавая ей текущую позицию и сообщение
  getMap(currentPosition, 'You are here')
}

function error({ message }) {
  console.log(message)
}