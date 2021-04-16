const userString = '/api/users';

const getIdInUserUrl = (url) => {
	const splittedUrl = url.split('/');
	if (url.includes(userString) && splittedUrl.length === 4) {
		return splittedUrl[3];
	}
};

module.exports = getIdInUserUrl;
