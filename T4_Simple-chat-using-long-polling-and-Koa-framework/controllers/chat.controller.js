const { createReadStream } = require('fs');
const { subscribeService, publishService } = require('../services/chat.services');

const renderHtml = ctx => {
	ctx.type = 'html';
	ctx.body = createReadStream('src/public/index.html');
};

const subscribe = async ctx => {
	const promise = await subscribeService(ctx);

	let message;

	try {
		message = await promise;
	} catch (err) {
		if (err.code === 'ECONNRESET') return;
		throw err;
	}

	try {
		ctx.body = subscribeService(ctx);
	} catch (err) {
		if (err.code === 'ECONNRESET') return;
		throw err;
	}
};

const publish = ctx => {
	const message = ctx.request.body.message;

	if (!message) {
		ctx.throw(400);
	}

	try {
		publishService(message);
	} catch (err) {
		throw err;
	}

	ctx.body = 'ok';
};

module.exports = { renderHtml, subscribe, publish };
