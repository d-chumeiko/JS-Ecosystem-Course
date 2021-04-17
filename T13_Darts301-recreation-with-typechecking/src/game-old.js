const { validatePlayerIndex, validateThrownDart } = require('./validators/validators');

class Game {
	constructor(names) {
		this.names = names;

		this.players = this.initPlayers(this.names);
		this.playerIndex = 0;
		this.rounds = 0;
	}

	score(playerIndex) {
		validatePlayerIndex(playerIndex, this.names);

		const player = this.getPlayer(playerIndex);

		return `${player.name} has ${player.score} points!`;
	}

	throw(number, factor) {
		validateThrownDart(number, factor);

		const bullseye = 50;
		const roundel = 25;

		let value = number * factor;

		if (number === bullseye || number === roundel) {
			value = number;
		}

		return this.throwHandler(value);
	}

	throwHandler(value) {
		const defaultRounds = 3;
		const rounds = this.getRounds();

		if (rounds === defaultRounds) {
			this.calculatePlayerIndex();
			this.resetRounds();
		}

		return this.calculatePlayerScore(value);
	}

	isWinner() {
		const finishScore = 0;
		const player = this.getPlayer();

		if (player.score === finishScore) {
			return true;
		}

		return false;
	}

	calculatePlayerScore(value) {
		const lowestDefaultScore = 2;
		const player = this.getPlayer();

		player.prevScore = player.score;
		player.score -= value;

		this.incrementRounds();

		if (this.isWinner()) {
			player.isWinner = true;
			return `${player.name} wins!`;
		}

		if (player.score < lowestDefaultScore) {
			player.score = player.prevScore;
		}

		return this.getPlayer();
	}

	initPlayers(names) {
		const defaultScore = 301;

		return names.map((name) => ({
			name,
			score: defaultScore,
			prevScore: defaultScore
		}));
	}

	getPlayer(playerIndex) {
		return playerIndex ? this.players[playerIndex] : this.players[this.playerIndex];
	}

	calculatePlayerIndex() {
		if (this.players.length - 1 === this.playerIndex) {
			return (this.playerIndex = 0);
		}

		return (this.playerIndex += 1);
	}

	getRounds() {
		return this.rounds;
	}

	resetRounds() {
		this.rounds = 0;
	}

	incrementRounds() {
		this.rounds += 1;
	}
}

module.exports = GameOld;
