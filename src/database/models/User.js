module.exports = (sequelize, dataTypes) => {
	// TODO finish updating to Sequelize models
	let alias = 'User';
	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		firstname: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: dataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: dataTypes.STRING,
			allowNull: false,
		},
	};
	let config = {
		tableName: 'users',
		timestamps: false,
	};
	const User = sequelize.define(alias, cols, config);

	return User;
};
