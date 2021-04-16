const throwFacebookAuthError = require('../errors/errors');

const sendFacebookError = (req, res) => {
	throwFacebookAuthError(res);
};

module.exports = sendFacebookError;