const User = require('../models/User');
const { encryptPassword } = require('../utils/crypto');
const sendEmail = require('../utils/nodemailer');

const openWelcomePage = (req, res) => {
	try {
		const email = req.user.email ? req.user.email : req.user.emails[0].value;
		const name = req.user.displayName ? req.user.displayName : req.user.name;

		return res.render('welcome', { name, email, layout: false });
	} catch (e) {
		throwServerError(res, err);
	}
};

const openSigninPage = (req, res) => {
	try {
		return res.render('signin', { layout: false });
	} catch (e) {
		throwServerError(res, err);
	}
};

const openSignupPage = (req, res) => {
  try {
    return res.render('signup', { layout: false });
  }
  catch (e) {
		throwServerError(res, err);
	}
};

const signup = async (req, res, next) => {
	try {
		const { email, name, password } = req.body;
		const isExistingUser = await User.findOne({ email });

		if (isExistingUser) {
			res.redirect('/signup');
			throw new Error('User with such email already exists');
		}

		const user = await new User({
			email,
			name,
			password: encryptPassword(password)
		});

		await user.save();
		next();

		sendEmail(email);
	} catch (e) {
		throwServerError(res, err);
	}
};

const logout = (req, res) => {
	req.session = null;
	req.logout();
	res.redirect('/signin');
};

module.exports = {
	openWelcomePage,
	openWelcomePage,
	openSigninPage,
	openSignupPage,
	signup,
	logout,
};
