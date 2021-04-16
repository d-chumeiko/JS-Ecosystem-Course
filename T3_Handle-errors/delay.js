const delay = data => {
	return new Promise(resolve =>
		setTimeout(() => {
			console.log(data);
			resolve(data);
		}, 1000)
	);
};

module.exports = delay;
