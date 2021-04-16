const { getPublicHtml, uploadFile, getFile, deleteFile } = require('../controllers/file.controller');
const { throwNotFoundError } = require('../errors/errors');
const { getFileNameFromUrl } = require('../utils/get-file-path');

const router = (req, res) => {
	if (req.url === '/' && req.method === 'GET') {
		return getPublicHtml(req, res);
	}

	if (getFileNameFromUrl(req.url) && req.method === 'POST') {
		return uploadFile(req, res);
	}

	if (getFileNameFromUrl(req.url) && req.method === 'GET') {
		return getFile(req, res);
	}

	if (getFileNameFromUrl(req.url) && req.method === 'DELETE') {
		return deleteFile(req, res);
	}

	throwNotFoundError(res);
};

module.exports = router;
