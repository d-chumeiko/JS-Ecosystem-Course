function throwServerError(e, res) {
	console.log(e);

	res.end(500).json({
		message: 'Server error'
	});
}

function throwNotFoundError(res) {
	res.status(404).json({
		message: 'User not found'
	});
}


module.exports = {
  throwServerError,
	throwNotFoundError
}