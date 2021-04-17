const User = require('../../models/user.model');
const {
	throwServerError
} = require('../../errors/errors');

const getUser = async (req, res) => {
	const user = await User.findByPk(+req.params.id);

	if (!user) return throwNotFoundError(res);

	return user;
};

async function getUsers(req, res) {
	const {
		sortBy,
		sortDir,
		perPage,
		offset,
		searchValue,
		searchBy
	} = req.query;

	const sort = sortBy ? [sortBy, sortDir] : ['firstName', 'asc'];

	const filterOpt = searchBy ?
		{
			[searchBy]: searchValue
		} :
		{};

	const options = {
		offset: +offset > 0 ? (+offset - 1) * perPage : 0,
		limit: +perPage || 10,
		order: [sort],
		where: filterOpt,
		attributes: ['id', 'firstName', 'lastName', 'company', 'position', 'email', 'phoneNumber']
	};

	try {
		const collection = await User.findAll(options);
		const collectionCount = await User.count();

		res.status(200).json({
			collection,
			total: collectionCount
		});
	} catch (e) {
		throwServerError(e, res);
	}
}

async function getUserById(req, res) {
	try {
		const user = await getUser(req, res);

		res.status(200).json(user.dataValues);
	} catch (e) {
		throwServerError(e, res);
	}
}

async function createUser(req, res) {
	try {
		const user = await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			company: req.body.company,
			position: req.body.position,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber
		});

		res.status(201).json({
			user
		});
	} catch (e) {
		throwServerError(e, res);
	}
}

async function updateUser(req, res) {
	try {
		const user = await getUser(req, res);

		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.company = req.body.company;
		user.position = req.body.position;
		user.email = req.body.email;
		user.phoneNumber = req.body.phoneNumber;

		await user.save();
		res.status(200).json({
			user
		});
	} catch (e) {
		throwServerError(e, res);
	}
}

async function deleteUser(req, res) {
	try {
		const user = await getUser(req, res);

		await user.destroy();

		res.status(204).json('HTTP 200');
	} catch (e) {
		throwServerError(e, res);
	}
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
};