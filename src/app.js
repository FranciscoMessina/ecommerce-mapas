const express = require('express');
const method = require('method-override');

const app = express();

// Middlewares
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(session({ secret: 'Shhh' }));

app.use(cookieParser());

const cookieSession = require('./middlewares/cookieSession');
const sessionToLocals = require('./middlewares/sessionToLocals');

app.use(cookieSession);
app.use(sessionToLocals);

// Establece EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Permite utilizar metodos PUT y DELETE
app.use(method('_method'));

// Hace que la data de un formulario se envie correctamente
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

// Rutas
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/user', userRoutes);

// Not found page
app.use((req, res, next) => {
	res.status(404).render('not-found');
});

// Apertura del servidor en puerto 3000.
app.listen(process.env.PORT || 3000, (req, res) => {
	console.log('Servidor corriendo en puerto 3000');
});
