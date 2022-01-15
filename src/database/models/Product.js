module.exports = (sequelize, dataTypes) => {
	// TODO finish updating to Sequelize models
	let alias = 'Product';
	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		size: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: dataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		desc: {
			type: dataTypes.TEXT,
		},
		img: {
			type: dataTypes.STRING,
		},
	};
	let config = {
		tableName: 'products',
		timestamps: false,
	};
	const Product = sequelize.define(alias, cols, config);

	return Product;
};
