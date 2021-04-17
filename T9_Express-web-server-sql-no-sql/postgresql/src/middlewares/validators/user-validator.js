const {
	body,
	validationResult
} = require('express-validator');

exports.validateUser = [
	body('firstName').notEmpty().trim().withMessage('First Name is required'),
	body('lastName').notEmpty().trim().withMessage('Last Name is required'),
	body('email')
	.notEmpty()
	.trim()
	.withMessage('Email address is required')
	.isEmail()
	.withMessage('Please fill a valid email address'),
	body('phoneNumber')
	.notEmpty()
	.trim()
	.withMessage('Phone Number field is required')
	.matches(/^(?=.*[0-9])[- +()0-9]+$/)
	.withMessage('Please fill a valid phone number'),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const mappedErrors = errors.array().map(({
				value,
				msg,
				param,
				location
			}) => ({
				value,
				message: msg,
				param,
				location
			}));

			return res.status(400).json({
				errors: mappedErrors
			});
		}
		next();
	}
]