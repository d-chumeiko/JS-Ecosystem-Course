const Sequelize = require('sequelize');
const db = require('../db/postgres-db');

const User = db.define('users', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER
	},
	firstName: {
		allowNull: false,
		type: Sequelize.STRING
	},
  lastName: {
		allowNull: false,
		type: Sequelize.STRING
	},
  company: {
		allowNull: true,
		type: Sequelize.STRING
	},
  position: {
		allowNull: true,
		type: Sequelize.STRING
	},
  email: {
		allowNull: false,
		type: Sequelize.STRING,
	},
  phoneNumber: {
		allowNull: false,
		type: Sequelize.STRING
	},
});

module.exports = User;
