const mongoose = require('mongoose');

const user = new mongoose.Schema(
	{
		firstName: {
			required: true,
			type: String
		},
		lastName: {
			required: true,
			type: String
		},
		company: {
			required: false,
			type: String
		},
		position: {
			required: false,
			type: String
		},
		email: {
			required: true,
			type: String
		},
		phoneNumber: {
			required: true,
			type: String
		},
	},
);

user.method('transform', function() {
	var obj = this.toObject();

	obj.id = obj._id;
	delete obj._id;

	return obj;
});

module.exports = mongoose.model('User', user);
