const { User } = require('../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const userController = {
	login: (req, res) => {
		res.render('users/login');
	},
	register: (req, res) => {
		res.render('users/register');
	},
	processRegister: (req, res) => {
		let errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.render('users/register', {
				errors: errors.mapped(),
				old: req.body,
			});
		}

		const { firstname, lastname, email, password } = req.body;

		const user = {
			firstname,
			lastname,
			email,
			password: bcrypt.hashSync(password, 10),
		};

		User.create(user)
			.then(() => {
				res.redirect('/user/login');
			})
			.catch((error) => console.log('Error:', error));
	},
	profile: (req, res) => {
		res.render('users/profile');
	},
	processLogin: (req, res) => {
		const errors = validationResult(req);
		const old = req.body;

		if (!errors.isEmpty()) {
			return res.render('users/login', {
				old,
				errors: errors.mapped(),
			});
		}

		// lo que viene del login
		const { email, remember } = req.body;

		// le pedimos al modelo el usuario
		User.findOne({
			where: {
				email,
			},
		})
			.then((user) => {
				delete user.password;

				// cargamos dentro de la sesión la propieda logged con el usuario (menos el password)
				req.session.logged = user;

				// guardamos un dato de nuestro usuario en la sesión (email, user_id)
				if (remember) {
					// clave
					res.cookie('user', user.id, {
						maxAge: 1000 * 60,
						signed: true,
					});
				}

				// redirigimos al profile
				res.redirect('/user/profile');
			})
			.catch((error) => console.log('Error:', error));

		// le sacamos el password
	},
	logout: (req, res) => {
		// borrar session y cookie
		req.session.destroy();
		res.clearCookie('user');

		res.redirect('/');
	},
};

module.exports = userController;
