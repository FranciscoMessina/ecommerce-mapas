const fs = require('fs');
const path = require('path');

module.exports = {
	filename: path.resolve(__dirname, '../data/users.json'),
	readFile() {
		const usersJson = fs.readFileSync(this.filename, 'utf-8');

		return JSON.parse(usersJson);
	},
	writeFile(newData) {
		const dataJson = JSON.stringify(newData, null, 2);

		fs.writeFileSync(this.filename, dataJson);
	},
	generateId() {
		const lastUser = this.readFile().pop();

		if (lastUser) {
			return lastUser.id + 1;
		}

		return 1;
	},
	findAll() {
		return this.readFile();
	},
	findByPk(id) {
		const users = this.readFile();

		const requestedUser = users.find((user) => user.id == id);

		return requestedUser;
	},
	findByField(field, text) {
		const users = this.readFile();
		const userFound = users.find((user) => user[field] === text);
		return userFound;
	},
	new(user) {
		user.id = this.generateId();

		const users = this.readFile();

		const usersUpdated = [...users, user];

		this.writeFile(usersUpdated);
		return user;
	},
	update(data, id) {
		const users = this.readFile();

		const newUsers = users.map((user) => {
			if (user.id == id) {
				user = {
					id: user.id,
					...data,
				};
			}
			return user;
		});

		this.writeFile(newUsers);
	},
	delete(id) {
		const users = this.readFile();

		const newUsers = users.filter((user) => user.id != id);

		this.writeFile(newUsers);

		return newUsers;
	},
};
