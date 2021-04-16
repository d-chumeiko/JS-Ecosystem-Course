const http = require('http');
const router = require('./routes/users.router');

const hostname = 'localhost';
const port = 4000;

const server = http.createServer((req, res) => {
	const initRouter = router(req, res);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
