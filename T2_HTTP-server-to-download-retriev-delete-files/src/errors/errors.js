const throwNotFoundError = (res) => {
	res.writeHead(404);

	const error = {
		code: 404,
		message: 'Not found error'
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

const throwExistingFileError = (res) => {
	res.writeHead(409);

	const error = {
		code: 409,
		message: 'File already exists'
	};

	res.end(JSON.stringify(error));
};

const throwFileSizeError = (res) => {
	res.writeHead(413);

	const error = {
		code: 413,
		message: 'File size should not more than 1MB'
	};

	res.end(JSON.stringify(error));
};

module.exports = {
	throwNotFoundError,
	throwServerError,
	throwExistingFileError,
	throwFileSizeError
};
