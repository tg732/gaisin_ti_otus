const inquirer = require('inquirer')

// конфиг для администрирования
var config = {
  host: 'localhost',
  port: 8080,
  db: 'postgres',
  name: 'app'
}

// проверка учетных данных
const requireLetterAndNumber = (value) => {
  if (value == "admin") {
    return true;
  }
  return 'Invalid login or password';
};

// вывод исходного меню
const menuPrompt = {
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: [
      'Get list',
      'Get element',
      'Set element',
      'Exit'
    ],
};

// авторизация
const loginQuestions = [
  {
    type: 'input',
    message: 'Enter your login: ',
    name: 'login',
    //mask: '*',
    validate: requireLetterAndNumber,
  },
  {
    type: 'password',
    message: 'Enter your password: ',
    name: 'password',
    mask: '*',
    validate: requireLetterAndNumber,
  }
]

// список параметров для администрирования
const paramList = {
  type: 'list',
  name: 'param',
  message: 'What param do you need?',
  choices: ['host', 'port', 'db', 'name'],
  filter(val) {
    return val.toLowerCase();
  }
}

// список параметров для задания значений
const setPrompt = {
  type: 'input',
  name: 'value',
  message: 'Input value:',
  default: 'None',
}

function start() {
  inquirer.prompt(loginQuestions).then((answers) => {
    showMenu()
  });
}

// основная функция
function main() {
  console.log('Hi, welcome to app administration');
  start();
}

// отображение меню
function showMenu() {
  inquirer.prompt(menuPrompt).then((answers) => {
    console.log(answers.menu)
    if (answers.menu === 'Get list') {
      // отображение списка параметров
      console.log(config);
      console.log('--------------------');
      showMenu()
    } else if (answers.menu == 'Get element') {
      // отображение значения выбранного элемента списка
      inquirer.prompt(paramList).then((answers) => {
        console.log(config[answers.param]);
        console.log('--------------------');
        showMenu()
      })
    } else if (answers.menu == 'Set element') {
      // задание значения для выбранного элемента списка
      inquirer.prompt(paramList).then((paramAnswer) => {
        inquirer.prompt(setPrompt).then((valueAnswer) => {
          config[paramAnswer.param] = valueAnswer.value
          console.log(config);
          console.log('--------------------');
          showMenu();
        })
      })
    } else {
      console.log('Good bye!')
    }
  });
}

// вызов основной функции
main();