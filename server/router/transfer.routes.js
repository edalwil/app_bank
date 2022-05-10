// exportamos express
const express = require('express');

//creamos una variable con otor nombre de app
const router = express.Router();

//improtamos middlewares
const {
  ckeckValidator,
  createTransitionValidator,
} = require('../middlewares/validations.middlewares');

//importamos controllers
const {
  transfer,
  listTranfersUsers,
} = require('../controllers/tranfers.controllers');

router.get('/', listTranfersUsers);

//importamos middlewares
const { validateToken } = require('../middlewares/accounter.middlewares');

//logica endpointe
router.post(
  '/',
  createTransitionValidator,
  ckeckValidator,
  validateToken,
  transfer
);

module.exports = { tranfersRouter: router };
