const fs = require('fs');
const path = require('path');

module.exports = {
	// Busqueda del archivo JSON
	filename: path.resolve(__dirname, '../data/products.json'),
	// Lectura del archivo JSON y pasado a un array
	readFile() {
		const productsJson = fs.readFileSync(this.filename, 'utf-8');

		return JSON.parse(productsJson);
	},
	// Pasaje de la informacion de array a JSON y escritura en el archivo
	writeFile(newData) {
		const dataJson = JSON.stringify(newData, null, 2);

		fs.writeFileSync(this.filename, dataJson);
	},
	// Generar un ID basado en el ID del ultimo producto.
	generateId() {
		const lastProduct = this.readFile().pop();

		if (lastProduct) {
			return lastProduct.id + 1;
		}

		return 1;
	},
	// Encuentra y devuelve todos los productos disponibles en el archivo  JSON
	findAll() {
		return this.readFile();
	},
	//  Encuentra 1 producto mediante su ID en el archivo JSON y lo devuelve
	findByPk(id) {
		const products = this.readFile();

		const requestedProduct = products.find((product) => product.id == id);

		return requestedProduct;
	},
	// Agrega un nuevo producto al array y lo pasa a la funcion que lo escribe en el archivo json
	create(product) {
		product.id = this.generateId();

		const products = this.readFile();

		const productsUpdated = [...products, product];

		this.writeFile(productsUpdated);
		return product;
	},
	// Modifica la informacion de un producto ya existente
	update(data, id) {
		const products = this.readFile();

		const newProducts = products.map((product) => {
			if (product.id == id) {
				product = {
					id: product.id,
					...data,
				};
			}
			return product;
		});

		this.writeFile(newProducts);
	},
	// Elimina un producto.
	delete(id) {
		const products = this.readFile();

		const newProducts = products.filter((product) => product.id != id);

		this.writeFile(newProducts);

		return newProducts;
	},
};
