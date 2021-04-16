let clients = [];

const subscribeService = async ctx => {
	return new Promise((resolve, reject) => {
		clients.push(resolve);

		ctx.res.on('close', () => {
			clients.splice(clients.indexOf(resolve), 1);
		});

		ctx.res.on('error', () => {
			const error = new Error('Connection closed');
			error.code = 'ECONNRESET';
			reject(error);
		});
	});
};

const publishService = message => {
	clients.forEach(resolve => {
		resolve(String(message));
	});

	clients = [];
};

module.exports = {
	subscribeService,
	publishService
};
