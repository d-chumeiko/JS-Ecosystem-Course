const Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres:postgres@localhost:5433/task9_db');

async function start() {
	try {
		await db.sync();
    console.log('db connected');

	} catch (e) {
		console.log(e);
	}
}

start();

module.exports = db;
