const { body } = require('express-validator');
const isFileImg = require('../helpers/isFileImg');

// Validaciones
const productValidation = [
	body('name').notEmpty().withMessage('Por favor ingresa el nombre del producto '),

	body('size').notEmpty().withMessage('Por favor ingresa el tamaño del producto'),

	body('price').notEmpty().withMessage('Por favor ingresa el precio del producto'),

	body('desc').notEmpty().withMessage('Por favor ingresa una descripción del producto'),
	body('img').custom((value, { req }) => {
		const { file } = req;

		// chequea que haya cargado imagen
		if (!file) {
			// esto es como si hicieramos .withMessage('Seleccione un archivo')
			throw new Error('Por favor ingresa una imagen');
		}

		if (!isFileImg(file.originalname)) {
			// disparar error
			throw new Error('Por favor ingresa una archivo que sea una imagen');
		}

		// chequea que la extensión sea la correcta

		return true;
	}),
];

module.exports = productValidation;
