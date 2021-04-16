const throwNotFoundError = (res) => res.end(`Error 404. Page doesn't exist!`);
const throwServerError = (res, error) => res.end(`Error 500. Server error!`, error);

module.exports = {
	throwNotFoundError,
	throwServerError
};
