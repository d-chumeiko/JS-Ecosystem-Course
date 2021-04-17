const Game = require('./game');

const playerNames = ['Peter', 'John', 'Tom'];

const game = new Game(playerNames);

console.log(game.throw(25, 3));
console.log(game.throw(50, 1));
console.log(game.throw(11, 3));
console.log(game.throw(10, 3));
console.log(game.throw(3, 3));
console.log(game.throw(15, 3));
console.log(game.throw(18, 3));
console.log(game.throw(3, 1));
console.log(game.throw(19, 3));
console.log(game.throw(9, 1));
console.log(game.score(0));
console.log(game.getPlayer(2));

