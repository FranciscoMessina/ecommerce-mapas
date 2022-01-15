const { body } = require('express-validator');
const { User } = require('../database/models');

// Validaciones
const registerValidation = [
	body('firstname').notEmpty().withMessage('Por favor ingresa tu nombre'),
	body('lastname').notEmpty().withMessage('Por favor ingresa tu apellido'),
	body('email')
		.notEmpty()
		.withMessage('Por favor ingresa tu email')
		.bail()
		.isEmail()
		.withMessage('Por favor ingresar un email valido')
		.bail()
		.custom(async (email) => {
			userFound = await User.findOne({ where: { email } });

			if (userFound) {
				return Promise.reject();
			} else {
				return Promise.resolve();
			}
		})
		.withMessage('Este email ya se encuentra registrado'),

	body('password').notEmpty().withMessage('Por favor ingresa una contraseña'),
	body('passwordConfirmation')
		.notEmpty()
		.withMessage('Por favor confirma tu contraseña')
		.bail()
		.custom((passwordConfirmation, { req }) => {
			const password = req.body.password;

			if (password !== passwordConfirmation) {
				return false;
			}
			return true;
		})
		.withMessage('Las contraseñas deben ser iguales'),
];

module.exports = registerValidation;
