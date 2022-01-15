const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../database/models');

const validationLoginUser = [
	body('email').notEmpty().withMessage('Por favor ingrese su e-mail').isEmail().withMessage('No es un e-mail valido'),
	body('password')
		.notEmpty()
		.withMessage('Por favor ingrese su contraseña')
		.bail()
		.custom((value, { req }) => {
			const { email, password } = req.body;

			// encontrar un usuario con el email
			return User.findOne({ where: { email } }).then((user) => {
				// chequear que userFound exista
				if (user) {
					// comparar contraseñas
					const passwordMatch = bcrypt.compareSync(password, user.password);

					if (!passwordMatch) {
						return Promise.reject('El email o la contraseña son inválidas');
					} else {
						return Promise.resolve();
					}
				}
			});
		}),
];

module.exports = validationLoginUser;
