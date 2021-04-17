function InvalidPlayerIndexException() {
	this.message = 'Player index should be integer index of players';
}

function InvalidDartNumberException() {
	this.message = 'Number should be from 0 to 20 or Roundel(25) or Bullseye(50)!';
}

function InvalidFactorException() {
	this.message = 'Factor should be from 1 to 3!';
}

function DartNumberOrFactorStringException() {
	this.message = 'Number and factor should be integer numbers!';
}

module.exports = {
	InvalidPlayerIndexException,
	InvalidDartNumberException,
	InvalidFactorException,
	DartNumberOrFactorStringException
};
