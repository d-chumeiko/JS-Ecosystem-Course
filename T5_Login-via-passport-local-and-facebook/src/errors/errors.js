const throwNotFoundError = (res) => {
	res.writeHead(404);

	const error = {
		code: 404,
		message: 'Not found error'
	};

	res.end(JSON.stringify(error));
};

const throwFacebookAuthError = (res) => {
	res.writeHead(400);

	const error = {
		code: 400,
		message: 'Error during facebook authentication'
	};

	res.end(JSON.stringify(error));
};

const throwServerError = (res, err) => {
	const error = {
		code: 500,
		message: `Server error: ${err}`
	};

	res.end(JSON.stringify(error));
};


module.exports = {
	throwNotFoundError,
	throwServerError,
	throwFacebookAuthError
};
