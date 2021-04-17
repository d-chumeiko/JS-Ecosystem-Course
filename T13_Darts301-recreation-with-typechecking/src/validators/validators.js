// @flow

import {
	InvalidPlayerIndexException,
	InvalidDartNumberException,
	InvalidFactorException,
	DartNumberOrFactorStringException,
	InvalidLeagueException
} from '../exceptions/exceptions';

import type {
	League,
	Player,
	PlayersScore,
	MappedPlayer,
	Leaders
} from '../types/types';

export const validateLeague = (league: ?League): ? Error => {
	const leagues = ['AMA', 'SEMI', 'PRO'];

	if (!leagues.includes(league)) {
		throw new InvalidLeagueException();
	}
}

export const validatePlayerIndex = (playerId: string, players: Array < MappedPlayer > ): ? Error => {
	const player = players.find(({
		id
	}) => id === playerId);

	if (!player) {
		throw new InvalidPlayerIndexException();
	}
};

export const validateThrownDart = (number: number, factor: number): ? Error => {
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