const readStream = stream => () =>
	new Promise((resolve, reject) => {
		stream
			.on('data', data => resolve(data))
			.on('error', err => reject(err))
	});

module.exports = readStream;
