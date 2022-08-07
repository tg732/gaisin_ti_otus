const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hello World\n')
})

//const readStream = fs.createReadStream('./test.txt', { encoding: 'utf8' })

async function print() {
 for await (const chunk of readStream) {
 console.log(chunk)
 }
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}  

async function writeFile() {
	const fs = require("fs");

	const fileWriteStream = fs.createWriteStream("./filename.txt");
	for (let i = 0; i < 50e6; i++) {
		num = getRandomInt(100)
		const ableToWrite = fileWriteStream.write(`${num} `);
		if (!ableToWrite) {
			await new Promise(resolve => {
				fileWriteStream.once('drain', resolve);
			});
		}
	}
	/*var arr = [];
	for (let i = 0; i < 1000000; i++) {
		num = getRandomInt(100)
		arr.push(num);
	}
	fs.writeFile("filename.txt", arr.join(" "), (err) => {
		if (err)
			console.log(err);
		else {
			console.log("File written successfully\n");
			console.log("The written has the following contents:");
			console.log(fs.readFileSync("books.txt", "utf8"));
		}
	});*/
}

async function print(readStream) {
	for await (const chunk of readStream) {
		console.log(chunk)
	}
}

server.listen(port, hostname, () => {
	//writeFile()
	const readStream = fs.createReadStream('./filename.txt', { start:0, end:52428800, encoding: 'utf8' })
	print(readStream)

//}

})

module.exports = {
	server
}