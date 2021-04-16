const fs = require('fs');
const readStream = require('./read-stream');
const delay = require('./delay');

async function read(path) {
	const stream = fs.createReadStream(path, {highWaterMark: 60, encoding: 'utf-8' });

	let data;

	const reader = readStream(stream);

	while (data = await reader()) {
		delay(data);
	}
}

read(__filename).catch(console.error);
