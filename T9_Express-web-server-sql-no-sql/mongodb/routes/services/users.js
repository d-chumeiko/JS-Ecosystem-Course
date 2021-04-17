const User = require('../../models/user.model');
const {
	throwServerError
} = require('../../errors/errors');

const getUser = async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) return throwNotFoundError(res);

	return user;
};

const getUsers = async (req, res) => {
	const {
		sortBy,
		sortDir,
		perPage,
		offset,
		searchValue,
		searchBy
	} = req.query;

	const sort = sortBy ? [sortBy, sortDir] : [firstName, 'asc'];

	const filterOpt = searchBy ?
		{
			[searchBy]: searchValue
		} :
		{};

	let returnedUsers = [];

	try {
		await User.find(filterOpt)
			.limit(+perPage || 10)
			.skip(+offset > 0 ? (+offset - 1) * perPage : 0)
			.sort([sort])
			.find(function (err, users) {
				returnedUsers = users.map((user) => user.transform());
			});

		const usersCount = await User.count({});

		res.status(200).json({
			collection: returnedUsers,
			total: usersCount
		});
	} catch (err) {
		throwServerError(err, res);
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await getUser(req, res);

		res.json(user);
	} catch (err) {
		throwServerError(err, res);
	}
};

const createUser = async (req, res) => {
	const {
		firstName,
		lastName,
		company,
		position,
		email,
		phoneNumber
	} = req.body;

	try {
		const user = await User.create({
			firstName,
			lastName,
			company,
			position,
			email,
			phoneNumber
		});

		await user.save();

		res.status(201).json(user);
	} catch (err) {
		throwServerError(err, res);
	}
};

const updateUser = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			company,
			position,
			email,
			phoneNumber
		} = req.body;

		const user = await getUser(req, res);

		user.firstName = firstName;
		user.lastName = lastName;
		user.company = company;
		user.position = position;
		user.email = email;
		user.phoneNumber = phoneNumber;

		await user.save();

		res.status(201).json(user);
	} catch (err) {
		throwServerError(err, res);
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await getUser(req, res);

		await user.deleteOne();

		res.status(200).json('HTTP 200');
	} catch (err) {
		throwServerError(err, res);
	}
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
};