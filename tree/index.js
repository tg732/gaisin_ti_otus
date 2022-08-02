const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hello World\n')
})

function showItemName(name, k, last_flag) {
	// делаем отступ для соответствующего уровня
	let str = "";
	for (let i=0; i < k-1; i++){
		str += "   "
	}
	// добавляем, если это не последний эл-т верхнего уровня
	if (!last_flag){
		str = "|" + str.substring(1)
	}
	str += '└──' + name
	//console.log(str)
	return str
}

function showBranch(struct, k, last_flag) {
	if ('items' in struct) {
		// формат вывода в зависимости от уровня вложенности
		if (k == 1) {
			exp = last_flag ? '└──' : '├──'
			showBranch.str += exp + struct['name'] + '\n'
		} else {
			showBranch.str += showItemName(struct['name'], k, last_flag) + '\n'
		}
		// вызываем функцию для элементов массива
		struct['items'].forEach((element, idx, array) => {
			return showBranch(element, k+1, last_flag)
		});
	} else {
		showBranch.str += showItemName(struct['name'], k, last_flag) + '\n'
	}
	//return str
}

function showTree(structObject) {
	var res_str = ''
	// добавляем отдельно первый элемент
	res_str += structObject['name'] + '\n'
	// для каждого эл-та первого уровня вызываем функцию
	structObject['items'].forEach((element, idx, array) => {
		showBranch.str = ''
		if (idx === array.length - 1){ 
			showBranch(element, 1, true, '')
		} else {
			showBranch(element, 1, false, '')
		}
		res_str += showBranch.str
	});
	return res_str
}

server.listen(port, hostname, () => {
	structObject = {
		"name": 1,
		"items": [{
			"name": 2,
			"items": [{ "name": 3 }, { "name": 4 }]
		}, {
			"name": 5,
			"items": [{ 
				"name": 6,
				"items": [{ "name": 7 }, { "name": 8 }] 
			}]
		}]
	}

	res = showTree(structObject)
	console.log(res)
})

module.exports = {
	showBranch,
	showItemName,
	showTree,
	server
}