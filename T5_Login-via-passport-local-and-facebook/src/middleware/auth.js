const { openSigninPage } = require('../controllers/main.controller');

const isLoggedInForWelcome = (req, res, next) => {
	if (req.user) {
		next();
		return;
	}
	openSigninPage(req, res);
};

const isLoggedInForSign = (req, res, next) => {
	if (req.user) {
		return res.redirect('/');
	}

	next();
};

module.exports = { isLoggedInForWelcome, isLoggedInForSign };
