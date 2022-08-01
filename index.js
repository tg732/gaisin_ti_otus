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
		str = str + "   "
	}
	// добавляем, если это не последний эл-т верхнего уровня
	if (!last_flag){
		str = "|" + str.substring(1)
	}
	console.log(str + '└──' + name)
}

function showTree(struct, k, last_flag) {
	if ('items' in struct) {
		if (k == 0) {
			console.log(struct['name'])
		} else if (k == 1) {
			exp = last_flag ? '└──' : '├──'
			console.log(exp + struct['name'])
		} else {
			showItemName(struct['name'], k, last_flag)
		}
		// вызываем функцию для элементов массива
		struct['items'].forEach((element, idx, array) => {
			return showTree(element, k+1, last_flag)
		});
	} else {
		showItemName(struct['name'], k, last_flag)
	}
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

	console.log(structObject['name'])
	structObject['items'].forEach((element, idx, array) => {
		if (idx === array.length - 1){ 
			showTree(element, 1, true)
		} else {
			showTree(element, 1, false)
		}
		
	});
	
	//console.log(`Server running at http://${hostname}:${port}/`)
})
