const http = require('http')
const fs = require('fs')
const readline = require('readline');
var stream = require('stream')
var liner = new stream.Transform( { objectMode: true } )
const util = require('util')
const pipeline = util.promisify(stream.pipeline)

const BUFFER_CAPACITY = 100000;
const MAX_MEM_USE = 10000;

const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hello World\n')
})

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}  

// функция для записи файла случайными целыми числами
async function writeFileWithNum() {
	const fs = require("fs");

	const fileWriteStream = fs.createWriteStream("./num_file.txt");
	for (let i = 0; i < 8e5; i++) {
		let arr_str = []
		for (let j = 0; j < 50; j++) {
			num = getRandomInt(100)
			arr_str += `${num} `
		}
		arr_str += '\n'
		num = getRandomInt(100)
		const ableToWrite = fileWriteStream.write(`${arr_str} `);
		if (!ableToWrite) {
			await new Promise(resolve => {
				fileWriteStream.once('drain', resolve);
			});
		}
	}
}

// сортировка массива и его добавление в файл
async function sortAndWriteToFile(arr, tmpFileNames) {
  arr.sort((a, b) => a - b);
  let tmpFileName = `tmp_sort_${tmpFileNames.length}.txt`;
  tmpFileNames.push(tmpFileName);
  console.log(`creating tmp file: ${tmpFileName}`);
  try {
	await pipeline(
		arr.map(e => `${e}\n`),
		fs.createWriteStream(tmpFileName, { highWaterMark: BUFFER_CAPACITY })
	  );
  } catch (err) {
	  console.error(err)
  }
  
  arr.length = 0;
}

// считывание построчно и запись порциями в несколько файлов
async function writeToFewFiles(liner) {
	let line
	let partArr = [];
	let size = 0;
	let tmpFileNames= [];
	while (null !== (line = liner.read())) {
		line_mas = line.split(" ")
		for await (let el of line_mas) {
			if (isNaN(parseFloat(el))) continue;
			size += el.length;
			partArr.push(parseFloat(el));
			if (size > MAX_MEM_USE) {
			  await sortAndWriteToFile(partArr, tmpFileNames);
			  size = 0;
			}
		}
	}
	if (partArr.length > 0) {
		await sortAndWriteToFile(partArr, tmpFileNames);
	}
	return 0;
}

function main() {
	var liner = require('./liner')
	var readStream = fs.createReadStream('./num_file.txt'/*, { start:0, end:52428800, encoding: 'utf8' }*/)
	readStream.pipe(liner)

	liner.on('readable', function () {
		writeToFewFiles(liner).then((num) => {
			console.log("That's all!")
		})
	})
}

server.listen(port, hostname, () => {
	// 0 - создание файла
	/*writeFileWithNum().then( value => {
		console.log('done!')
	})*/
	
	main()
})

module.exports = {
	server
}