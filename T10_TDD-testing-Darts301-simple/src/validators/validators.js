const {
	InvalidPlayerIndexException,
	InvalidDartNumberException,
	InvalidFactorException,
	DartNumberOrFactorStringException
} = require('../exceptions/exceptions');

const validatePlayerIndex = (index, names) => {
	if (index >= names.length || !Number.isInteger(index)) {
		throw new InvalidPlayerIndexException();
	}
};

const validateThrownDart = (number, factor) => {
	const bullseye = 50;
	const roundel = 25;
	const minFactor = 1;
	const maxFactor = 3;
	const minValue = 0;
	const maxValue = 20;

	if (!Number.isInteger(number) || !Number.isInteger(factor)) {
		throw new DartNumberOrFactorStringException();
	}

	if ((number < minValue || number > maxValue) && number !== bullseye && number !== roundel) {
		throw new InvalidDartNumberException();
	}

	if (factor < minFactor || factor > maxFactor) {
		throw new InvalidFactorException();
	}
};

module.exports = {
	validatePlayerIndex,
	validateThrownDart
};
