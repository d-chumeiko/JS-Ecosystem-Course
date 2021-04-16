const {
	getUsersService,
	addUserService,
	getUserService,
	deleteUserService,
	updateUserService
} = require('../services/users.service');
const { throwServerError } = require('../errors/errors');
const getIdInUserUrl = require('../helpers/main.helper');

const getAllUsers = (req, res) => {
	try {
		const users = getUsersService();

		return res.end(users);
	} catch (e) {
		return throwServerError(res, e);
	}
};

const addUser = (req, res) => {
	try {
		let userData = '';

		req.on('data', (chunk) => (userData += chunk));

		req.on('end', () => {
			const user = addUserService(userData);
			res.end(user);
		});
	} catch (e) {
		return throwServerError(res, e);
	}
};

const getUserById = (req, res) => {
	try {
		const userId = getIdInUserUrl(req.url);
		const user = getUserService(userId);

		res.end(user);
		return user;
	} catch (e) {
		return throwServerError(res, e);
	}
};

const deleteUser = (req, res) => {
	try {
		const userId = getIdInUserUrl(req.url);
		const user = deleteUserService(userId);

		res.end(user);
	} catch (e) {
		return throwServerError(res, e);
	}
};

const updateUser = (req, res) => {
	try {
		const userId = getIdInUserUrl(req.url);

		let newUserData = '';

		req.on('data', (chunk) => (newUserData += chunk));

		req.on('end', () => {
			const updatedUser = updateUserService(userId, newUserData);
			res.end(updatedUser);
		});
	} catch (e) {
		return throwServerError(res, e);
	}
};

module.exports = {
	getAllUsers,
	addUser,
	getUserById,
	deleteUser,
	updateUser
};
