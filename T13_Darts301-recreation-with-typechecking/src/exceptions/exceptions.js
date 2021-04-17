// @flow

export function InvalidPlayerIndexException(): void {
	this.message = 'Invalid player id';
}

export function InvalidLeagueException(): void {
	this.message = 'Invalid league';
}

export function InvalidDartNumberException(): void {
	this.message = 'Number should be from 0 to 20 or Roundel(25) or Bullseye(50)!';
}

export function InvalidFactorException(): void {
	this.message = 'Factor should be from 1 to 3!';
}

export function DartNumberOrFactorStringException(): void {
	this.message = 'Number and factor should be integer numbers!';
}