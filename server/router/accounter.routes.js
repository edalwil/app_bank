//importamos express
const express = require('express');

//creamos una variable con otor nombre de app
const router = express.Router();

//importamos middlewares
const { validateToken } = require('../middlewares/accounter.middlewares');
const {
  createAccountValidator,
  ckeckValidator,
} = require('../middlewares/validations.middlewares');

//importamos controllers
const {
  createAccountBack,
  getListAccounter,
  loginUser,
  listAccounter,
} = require('../controllers/accounts.controllers');

//rutas donde no pidan token
router.post('/login', loginUser);
router.post(
  '/signup',
  createAccountValidator,
  ckeckValidator,
  createAccountBack
);

//aplicar validateToken a todos los router
router.use(validateToken);

//logica endpointe
router.get('/', listAccounter);
router.get('/:id/history', getListAccounter);

module.exports = { accounterRouter: router };
