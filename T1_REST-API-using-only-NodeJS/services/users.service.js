const db = require('../db/fake-db');

const getUsersService = () => {
	const users = db.getCollection();
	return JSON.stringify(users);
};

const addUserService = (data) => {
	let userData = db.create(JSON.parse(data));
	return JSON.stringify(userData);
};

const getUserService = (id) => {
	const user = db.getById(id);
	return JSON.stringify(user);
};

const deleteUserService = (id) => {
	return db.remove(id);
};

const updateUserService = (userId, data) => {
	const user = JSON.parse(getUserService(userId));
	data = JSON.parse(data);

	const newUserData = { ...user, ...data };

	return JSON.stringify(db.update(newUserData));
};

module.exports = {
	getUsersService,
	addUserService,
	getUserService,
	deleteUserService,
	updateUserService
};
