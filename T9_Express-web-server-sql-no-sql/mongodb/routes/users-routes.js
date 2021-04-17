const express = require('express');
const {
	validateUser
} = require('../middlewares/validators/user-validator');
const {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
} = require('./services/users');

require('../db/mongo-db');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post(
	'/',
	validateUser,
	createUser
);

router.put(
	'/:id',
	validateUser,
	updateUser
);

router.delete('/:id', deleteUser);

router.all('/', function (req, res, next) {
	res.send('Request method is not supported');
});

module.exports = router;