const { Account } = require('../models/accounter.models'); //importamos models
const { Transfers } = require('../models/tranfer.models'); //importamos Transfers
const bcrypt = require('bcryptjs'); //importamos la libreria para incriptar contraseñas
const jwt = require('jsonwebtoken'); //importamos la liberia para genera token web
const dotenv = require('dotenv'); // importamos la libreria para generar variables de entorno
const { AppError } = require('../utils/appError');

//mandamos a llamar mi dotenv
dotenv.config({ path: './config.env' });

//listado de ususuarios
const listAccounter = async (req, res, next) => {
  try {
    //lista de usuarios creados
    const listUser = await Account.findAll({
      attributes: { exclude: ['password'] },
    });

    //respuesta positiva
    res.status(200).json({
      listUser,
    });
  } catch (error) {
    next(error);
  }
};

//lista de transaciones de el usuario logiado
const getListAccounter = async (req, res, next) => {
  try {
    //id del usuario
    const userLogin = req.sessisioUser.id;
    const { id } = req.params;

    //validad que el usuario
    if (userLogin !== Number(id)) {
      return next(new AppError('id is not incorrect', 404));
    }

    //listado de tranferencias
    const listTranfers = await Account.findOne({
      where: { id: userLogin },
      include: [{ model: Transfers }],
    });

    //ocultamos contraseña
    listTranfers.password = undefined;

    //enviamos respuesta positiva
    res.status(200).json({
      listTranfers,
    });
  } catch (error) {
    next(error);
  }
};

//crear cuenta bancaria
const createAccountBack = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 1000000
    );

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newAccount = await Account.create({
      name,
      password: hashPassword,
      accountNumber,
      amount: 1000,
    });

    newAccount.password = undefined;

    res.status(200).json({
      newAccount,
    });
  } catch (error) {
    next(error);
  }
};

//login del usuario
const loginUser = async (req, res, next) => {
  try {
    //datos del cliente
    const { accountNumber, password } = req.body;

    //validar si exisite la cuenta
    const userLogin = await Account.findOne({
      where: { accountNumber, status: 'active' },
    });

    if (!userLogin) {
      return next(new AppError('account does not exist', 404));
    }

    //validamos password
    const validpassword = await bcrypt.compare(password, userLogin.password);

    if (!validpassword) {
      return next(new AppError('password not valid', 404));
    }

    //generar jswebtoken
    const token = await jwt.sign({ id: userLogin.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRES,
    }); //expiresIn => le damos un timepo para expirar el token y que el usuario vuela a login

    //excluimos la contraseña
    userLogin.password = undefined;

    //enviamos respuesta positiva
    res.status(200).json({
      token,
      userLogin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAccountBack,
  getListAccounter,
  loginUser,
  listAccounter,
};
