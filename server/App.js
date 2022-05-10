const express = require('express'); // importamos express
const rateLimit = require('express-rate-limit'); //importamos express-rate-limit para limitar las peticiones en la api

//inportamos cros => libreria para dar permiso para la peticiones a la api por el esplorador
const cors = require('cors');

//init express app
const app = express();

//controller
const { globalErrorHandler } = require('./controllers/error.controllers');

//habilitamos cors
app.use(cors());

//Routers
const { accounterRouter } = require('./router/accounter.routes');
const { tranfersRouter } = require('./router/transfer.routes');

//Utils
const { db } = require('./utils/baseDatos');

// Habilitar datos JSON entrantes
app.use(express.json());

//limitar ip respuesta
const limiter = rateLimit({
  max: 5, //cantidad de peticiones que recibimos
  windowMs: 1 * 60 * 60 * 1000, //tiempo en que recibimos las peticiones
  messages: 'too  many requests from this IP',
});

app.use(limiter); //escuchamos la const limiter

// Endpoints
app.use('/api/v1/users', accounterRouter);
app.use('/api/v1/transfers', tranfersRouter);

//escucha de mis error globales
app.use('*', globalErrorHandler);

module.exports = { app };
