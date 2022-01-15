const { Product } = require('../database/models');
const urlConvert = require('../helpers/urlConvert');

const mainController = {
	index: (req, res) => {
		Product.findAll().then((products) => {
			products.map((p) => {
				p.img = urlConvert(p.img);
			});
			res.render('index', { products });
		});
	},
};

module.exports = mainController;
