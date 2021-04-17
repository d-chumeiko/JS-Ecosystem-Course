// @flow

import type { League, Player, MappedPlayer } from './types/types';

import { validatePlayerIndex, validateLeague } from './validators/validators';

export default class Players {
	players: Array<MappedPlayer>;

	constructor(players: Array<Player>) {
		this.players = this.initPlayers(players);
	}

	sortPlayersForTable(): Array<MappedPlayer> {
		return this.players.sort((a, b) => a.score - b.score);
	}

	getLeaderByLeague(playerLeague: ?League): string {
		validateLeague(playerLeague);

		return this.players
			.filter(({ league }) => league === playerLeague)
			.reduce((a, b) => (a.score < b.score ? a : b)).fullName;
	}

	getTotalLeader(): string {
		return this.players.reduce((a, b) => (a.score < b.score ? a : b)).fullName;
	}

	calculatePlayerScore(id: string, value: number): ?MappedPlayer | string {
		const lowestDefaultScore = 2;
		const player: ?MappedPlayer = this.getPlayer(id);

		if (!player) {
			return null;
		}

		player.prevScore = player.score;
		player.score -= value;

		if (this.isWinner(id)) {
			player.isWinner = true;
			return `${player.fullName} wins!`;
		}

		if (player.score < lowestDefaultScore) {
			player.score = player.prevScore;
		}

		return this.getPlayer(id);
	}

	isWinner(id: string): boolean | null {
		const finishScore = 0;
		const player: ?MappedPlayer = this.getPlayer(id);

		if (!player) {
			return null;
		}

		if (player.score === finishScore) {
			return true;
		}

		return false;
	}

	getPlayer(playerId: string): ?MappedPlayer {
		validatePlayerIndex(playerId, this.players);

		return this.players.find(({ id }) => id === playerId);
	}

	initPlayers(players: Array<Player>): Array<MappedPlayer> {
		const defaultScore = 301;

		return players.map(({ ...rest }) => ({
			...rest,
			score: defaultScore,
			prevScore: defaultScore
		}));
	}
}
