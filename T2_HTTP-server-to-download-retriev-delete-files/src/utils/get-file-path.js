const path = require('path');

const getFileNameFromUrl = (url) => {
	const splittedUrl = url.split('/');
	const fileIndex = 1;

	return splittedUrl[fileIndex];
};

const getFilePath = (reqUrl) => {
	const FILES_DIRECTORY = 'files';
	const fileName = getFileNameFromUrl(reqUrl);
	const filePath = path.join(FILES_DIRECTORY, fileName);

	return filePath;
};

module.exports = { getFilePath, getFileNameFromUrl };
