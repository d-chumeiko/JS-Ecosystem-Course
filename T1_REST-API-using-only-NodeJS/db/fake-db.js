let db = [];

function makeId() {
	let id = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < 36; i++) id += possible.charAt(Math.floor(Math.random() * possible.length));

	return id;
}

module.exports = {
	getCollection() {
		return db;
	},
	getById(id) {
		let matchedEntries = db.filter((entry) => entry.id === id);

		if (matchedEntries.length) {
			return matchedEntries[0];
		}

		return 'There is no such record in DB';
	},

	create(model) {
		model.id = makeId();
		db.push(model);

		return model;
	},

	update(model) {
		let matchedModel = db.filter((entry) => entry.id === model.id)[0];

		if (matchedModel) {
			db[db.indexOf(matchedModel)] = model;
			return model;
		}

		return 'There is no such model';
	},
	remove(id) {
		let matchedModel = db.filter((entry) => entry.id === id)[0];

		if (matchedModel) {
			db.splice(db.indexOf(matchedModel), 1);
			return 'User was deleted';
		}
		return 'There is no such model';
	}
};
