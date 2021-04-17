import Game from './game';

const gameName = '1';
const game = new Game(
	gameName,
	{
		id: '1',
		fullName: 'Ivan',
		league: 'SEMI'
	},
	{
		id: '2',
		fullName: 'Maksym',
		league: 'PRO'
	},
	{
		id: '3',
		fullName: 'Oleh',
		league: 'AMA'
	},
	{
		id: '4',
		fullName: 'Hanna',
		league: 'PRO'
	},
	{
		id: '5',
		fullName: 'Marie',
		league: 'AMA'
	},
	{
		id: '6',
		fullName: 'John',
		league: 'SEMI'
	}
);

const start = () => {
	game.throw('1', 7, 3);
	game.throw('1', 20, 1);
	game.throw('1', 25, 1);

	game.throw('2', 19, 2);
	game.throw('2', 25, 1);
	game.throw('2', 50, 1);

	game.throw('3', 14, 2);
	game.throw('3', 25, 1);
	game.throw('3', 20, 1);

	game.throw('4', 20, 3);
	game.throw('4', 15, 2);
	game.throw('4', 18, 3);

	game.throw('5', 16, 3);
	game.throw('5', 10, 2);
	game.throw('5', 15, 1);

	game.throw('6', 50, 1);
	game.throw('6', 50, 2);
	game.throw('6', 12, 3);

	console.log(game.score('1'));
	console.log(game.score('6'));

	console.log(game.getLeaders());

	game.printTable();

	console.log('----------------------------------------------------------');

	game.throw('1', 12, 2);
	game.throw('1', 18, 1);
	game.throw('1', 20, 3);

	game.throw('2', 25, 1);
	game.throw('2', 50, 1);
	game.throw('2', 50, 1);

	game.throw('3', 14, 2);
	game.throw('3', 25, 1);
	game.throw('3', 20, 3);

	game.throw('4', 25, 3);
	game.throw('4', 15, 2);
	game.throw('4', 18, 3);

	game.throw('5', 16, 3);
	game.throw('5', 10, 2);
	game.throw('5', 15, 1);

	game.throw('6', 50, 1);
	game.throw('6', 50, 2);
	game.throw('6', 12, 3);

	game.printTable();
}

start();

// console.log(game.throw(25, 3));
// console.log(game.throw(50, 1));
// console.log(game.throw(11, 3));
// console.log(game.throw(10, 3));
// console.log(game.throw(3, 3));
// console.log(game.throw(15, 3));
// console.log(game.throw(18, 3));
// console.log(game.throw(3, 1));
// console.log(game.throw(19, 3));
// console.log(game.throw(9, 1));
// console.log(game.score(0));
// console.log(game.getPlayer(2));
/*

const GameOld = require('./game-old');

const playerNamesOld = ['Peter', 'John', 'Tom'];

const gameOld = new GameOld(playerNames);

console.log(gameOld.throw(25, 3));
console.log(gameOld.throw(50, 1));
console.log(gameOld.throw(11, 3));
console.log(gameOld.throw(10, 3));
console.log(gameOld.throw(3, 3));
console.log(gameOld.throw(15, 3));
console.log(gameOld.throw(18, 3));
console.log(gameOld.throw(3, 1));
console.log(gameOld.throw(19, 3));
console.log(gameOld.throw(9, 1));
console.log(gameOld.score(0));
console.log(gameOld.getPlayer(2));
*/
