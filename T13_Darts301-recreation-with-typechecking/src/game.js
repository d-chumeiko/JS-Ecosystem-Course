// @flow
import chalk from 'chalk';
import { validatePlayerIndex, validateThrownDart } from './validators/validators';
import type { League, Player, PlayersScore, MappedPlayer, Leaders } from './types/types';
import Players from './players';

class Game {
	name: string;
	playerCount: number;

	players: Players;

	constructor(gameName: string, ...rest: Array<Player>) {
		this.name = gameName;
		this.playerCount = rest.length;

		this.players = new Players(rest);
	}

	throw(id: string, score: number, multiplier: number): ?MappedPlayer | string {
		validateThrownDart(score, multiplier);

		const bullseye = 50;
		const roundel = 25;

		let value = score * multiplier;

		if (score === bullseye || score === roundel) {
			value = score;
		}

		return this.players.calculatePlayerScore(id, value);
	}

	score(id: string): ?string {
		const player: ?MappedPlayer = this.players.getPlayer(id);

		if (!player) {
			return null;
		}

		return `${player.fullName} has ${player.score} points!`;
	}

	getLeaders(): Leaders {
		return {
			totalLeader: this.players.getTotalLeader(),
			pro: this.players.getLeaderByLeague('PRO'),
			semi: this.players.getLeaderByLeague('SEMI'),
			amateur: this.players.getLeaderByLeague('AMA')
		};
	}

	printTable() {
		const ama: string = 'AMA';
		const semi: string = 'SEMI';
		const pro: string = 'PRO';

		const paintTable = (player: MappedPlayer, color: string): ?string =>
			chalk`
			{${color} ${player.score.toString()}   ${player.fullName}   ${player.league}}
		`;

		const players: Array<MappedPlayer> = this.players.sortPlayersForTable();

		players.forEach((player) => {
			if (player.league === ama) {
				console.log(paintTable(player, 'magenta'));
			}

			if (player.league === semi) {
				console.log(paintTable(player, 'cyan'));
			}

			if (player.league === pro) {
				console.log(paintTable(player, 'yellowBright'));
			}
		});
	}
}

module.exports = Game;
