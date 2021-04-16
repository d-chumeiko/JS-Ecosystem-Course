const http = require('http');
const router = require('./routes/file.router');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(router);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
