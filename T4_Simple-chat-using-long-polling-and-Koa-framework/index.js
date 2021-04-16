'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes/chat.routes');

const app = new Koa();

const PORT = 3000;
const HOSTNAME = 'localhost';

app.use(bodyParser());
app.use(router);

app.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
