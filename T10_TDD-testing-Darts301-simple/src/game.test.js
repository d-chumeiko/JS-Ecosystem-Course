const Game = require('./game');
const {
	InvalidPlayerIndexException,
	InvalidDartNumberException,
	InvalidFactorException,
	DartNumberOrFactorStringException
} = require('./exceptions/exceptions');

describe('Class Game', () => {
	const playerNames = [ 'Peter', 'John', 'Tom' ];

	const PeterIndex = 0;
	const JohnIndex = 1;
	const TomIndex = 2;

	let game;

	beforeEach(() => {
		game = new Game(playerNames);
	});

	describe('Game completion testing', () => {
		beforeEach(() => {
			game.throw(25, 3);
			game.throw(50, 1);
			game.throw(11, 3);
			game.throw(20, 3);
			game.throw(20, 3);
			game.throw(20, 3);
			game.throw(20, 3);
			game.throw(20, 3);
			game.throw(20, 3);
			game.throw(12, 3);
			game.throw(20, 3);
			game.throw(10, 3);
			game.throw(10, 3);
			game.throw(10, 3);
			game.throw(3, 3);
			game.throw(15, 3);
			game.throw(18, 3);
		});

    test('Tom should win the game', () => {
      const expectedResult = 'Tom wins!';
      const finishThrow = game.throw(11, 2);
      const player = game.getPlayer(TomIndex);

      expect(finishThrow).toEqual(expectedResult);
      expect(player.isWinner).toBe(true);
    });

    test('As a minimum score to throw finish dart should be 2, Peter will get a previous score', () => {

      game.throw(3, 1);
      game.throw(19, 3);
      game.throw(9, 1);

      const player = game.getPlayer(PeterIndex);
      const expectedResult = player.score === player.prevScore;

      expect(expectedResult).toBe(true);
    });
	});

	describe('game.score method testing', () => {
		test('John score should be returned', () => {
			const expectedScore = 'John has 286 points!';

			game.throw(13, 1);
			game.throw(20, 2);
			game.throw(7, 3);
			game.throw(15, 1);

			const score = game.score(JohnIndex);

			expect(score).toEqual(expectedScore);
		});

		test('failed while returning score with non-existent index', () => {
			expect(() => {
				const nonExistentPlayerIndex = 25;

				game.score(nonExistentPlayerIndex);
			}).toThrow(InvalidPlayerIndexException.message);
		});
	});

	describe('game.throw method testing', () => {
		test('single/double/triple usual throwing value', () => {
			const expectedResult = {
				name: 'Peter',
				score: 218,
				prevScore: 251
			};

			let throwDart = game.throw(20, 1);
			throwDart = game.throw(15, 2);
			throwDart = game.throw(11, 3);

			expect(throwDart).toEqual(expectedResult);
		});

		test('bullseye/roundel throwing value', () => {
			const expectedResult = {
				name: 'Peter',
				score: 226,
				prevScore: 276
			};

			let throwDart = game.throw(25, 3);
			throwDart = game.throw(50, 1);

			expect(throwDart).toEqual(expectedResult);
		});

		test('failed usual throwing value - Factor should be from 1 to 3', () => {
			expect(() => {
				game.throw(20, 4);
			}).toThrow(InvalidFactorException.message);
		});

		test('failed usual throwing value - Number should be from 0 to 20 or Roundel(25) or Bullseye(50)', () => {
			expect(() => {
				game.throw(100, 1);
			}).toThrow(InvalidDartNumberException.message);
		});

		test('failed usual throwing value - Number and factor should be integer numbers!', () => {
			expect(() => {
				game.throw(100, 'text');
			}).toThrow(DartNumberOrFactorStringException.message);
		});
	});

	describe('Game properties should be initialised', () => {
		test('game.names should be initialised', () => {
			expect(game.names).toEqual(playerNames);
		});

		test('game.players should be initialised', () => {
			const expectedPlayersArray = [
				{
					name: 'Peter',
					score: 301,
					prevScore: 301
				},
				{
					name: 'John',
					score: 301,
					prevScore: 301
				},
				{
					name: 'Tom',
					score: 301,
					prevScore: 301
				}
			];

			expect(game.players).toEqual(expectedPlayersArray);
		});

		test('game.playerIndex should be 0', () => {
			expect(game.playerIndex).toBe(0);
		});

		test('game.rounds should be 0', () => {
			expect(game.rounds).toBe(0);
		});
	});
});
