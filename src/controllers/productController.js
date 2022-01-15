const { Product } = require('../database/models');
const path = require('path');
const { validationResult } = require('express-validator');
const urlConvert = require('../helpers/urlConvert');
const fs = require('fs');

const productController = {
	product: (req, res) => {
		Product.findByPk(req.params.id)
			.then((product) => {
				product.img = urlConvert(product.img);
				res.render('products/product', { product });
			})
			.catch((error) => console.log('Error:', error));
	},
	cart: (req, res) => {
		res.render('products/cart');
	},
	productList: (req, res) => {
		Product.findAll()
			.then((products) => {
				products.map((p) => {
					p.img = urlConvert(p.img);
				});
				res.render('products/productList', { products });
			})
			.catch((error) => console.log('Error:', error));
	},
	new: (req, res) => {
		res.render('products/createNew');
	},
	create: (req, res) => {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			if (req.file) {
				fs.unlinkSync(req.file.path);
			}

			return res.render('products/createNew', {
				errors: errors.mapped(),
				old: req.body,
			});
		}

		const { filename } = req.file;

		const { name, desc, size, price } = req.body;

		const product = {
			name,
			desc,
			size,
			price,
			img: filename,
		};

		Product.create(product)
			.then((product) => {
				res.redirect('/products/detail/' + product.id);
			})
			.catch((error) => console.log('Error:', error));
	},
	edit: (req, res) => {
		Product.findByPk(req.params.id)
			.then((product) => {
				res.render('products/edit', { product });
			})
			.catch((error) => console.log('Error:', error));
	},
	update: (req, res) => {
		const data = req.body;
		const { id } = req.params;

		Product.findByPk(id)
			.then((product) => {
				const { file } = req;
				// imagen original
				let img = product.img;
				//  si hay imagen sobreescribir la original si no devolver la original
				if (file) {
					img = file.filename;
				}

				data.img = img;

				Product.update(data, { where: { id } }).then(() => {
					res.redirect('/products/detail/' + id);
				});
			})
			.catch((error) => console.log('Error:', error));
		// info sobre el archivo subido
	},
	delete: (req, res) => {
		const id = req.params.id;

		Product.findByPk(id).then((product) => {
			fs.unlinkSync(path.resolve(__dirname, '../../public/img/' + product.img));

			Product.destroy({ where: { id } });

			res.redirect('/products/controlpanel');
		});
	},
	controlPanel: (req, res) => {
		Product.findAll().then((products) => {
			res.render('products/controlPanel', { products });
		});
	},
};

module.exports = productController;
