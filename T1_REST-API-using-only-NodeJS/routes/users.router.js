const url = require('url');
const { throwNotFoundError } = require('../errors/errors');
const getIdInUserUrl = require('../helpers/main.helper');
const { getAllUsers, addUser, getUserById, deleteUser, updateUser } = require('../controllers/users.controller');

const router = (req, res) => {
	if (req.url === '/api/users' || (req.url === '/api/users/' && req.method === 'GET')) {
		return getAllUsers(req, res);
	}

	if (req.url === '/api/users' || (req.url === '/api/users/' && req.method === 'POST')) {
		return addUser(req, res);
	}

	if (getIdInUserUrl(req.url) && req.method === 'GET') {
		return getUserById(req, res);
	}

	if (getIdInUserUrl(req.url) && req.method === 'PUT') {
		return updateUser(req, res);
	}

	if (getIdInUserUrl(req.url) && req.method === 'DELETE') {
		return deleteUser(req, res);
	}

	throwNotFoundError(res);
};

module.exports = router;
