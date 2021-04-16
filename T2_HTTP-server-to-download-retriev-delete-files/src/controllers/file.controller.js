const path = require('path');
const fs = require('fs');
const mime = require('mime');

const { getFilePath } = require('../utils/get-file-path');

const {
	throwNotFoundError,
	throwServerError,
	throwExistingFileError,
	throwFileSizeError
} = require('../errors/errors');

const getPublicHtml = (req, res) => {
	try {
		const indexHtmlFileRelativePath = '../../public/index.html';
		const indexHtmlFilePath = path.join(__dirname, indexHtmlFileRelativePath);

		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		fs.readFile(indexHtmlFilePath, (err, data) => {
			if (err) {
				console.error(err);
				res.writeHead(404);
				res.write('File not found');
			}

			res.write(data);
			res.end();
		});
	} catch (e) {
		throwServerError(res, e);
	}
};

const uploadFile = (req, res) => {
	try {
		const filePath = getFilePath(req.url);
		const folderPath = 'files';

		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync('files');
		}

		if (fs.existsSync(filePath)) {
			return throwExistingFileError(res);
		}

		const MAX_CONTENT_LENGTH = 1048576;
		const contentLength = req.headers['content-length'];

		if (contentLength > MAX_CONTENT_LENGTH) {
			return throwFileSizeError(res);
		}

		const file = fs.createWriteStream(filePath);

		req.pipe(file);

		req.on('end', () => {
			res.statusCode = 200;
			res.end();
		});
	} catch (e) {
		throwServerError(res, e);
	}
};

const getFile = (req, res) => {
	try {
		const filePath = getFilePath(req.url);

		if (!fs.existsSync(filePath)) {
			return throwNotFoundError(res);
		}

		const fileType = mime.getType(filePath);
		const file = fs.createReadStream(filePath);

		res.setHeader('Content-Type', fileType);
		res.writeHead(200);

		file.pipe(res);

		file.on('error', (e) => {
			throwServerError(res, e);
		});

		req.on('end', () => {
			res.end('File loaded');
		});
	} catch (e) {
		throwServerError(res, e);
	}
};

const deleteFile = (req, res) => {
	try {
		const filePath = getFilePath(req.url);

		if (!fs.existsSync(filePath)) {
			return throwNotFoundError(res);
		}

		fs.unlink(filePath, (err) => {
			if (err) {
				throwServerError(res, err);
			}

			res.writeHead(200);
			res.end('File deleted successfully');
		});
	} catch (e) {
		throwServerError(res, e);
	}
};

module.exports = {
	getPublicHtml,
	uploadFile,
	getFile,
	deleteFile
};
