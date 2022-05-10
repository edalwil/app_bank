//importamos moldes tranfers
const { Transfers } = require('../models/tranfer.models');
const { Account } = require('../models/accounter.models');
const { AppError } = require('../utils/appError');

//realizar una tranferencia
const transfer = async (req, res, next) => {
  try {
    //datos para envio de tranferencia
    const { receiveAccount, amount } = req.body;

    //usuario que envia dinero
    const sendUser = req.sessisioUser;

    // usuario que recibe la plata
    const receiveUser = await Account.findOne({
      where: { accountNumber: receiveAccount, status: 'active' },
    });

    //confirmado si esta la cuenta valida del usuario que recibe la plata
    if (!receiveUser) {
      return next(new AppError('error account does not exist', 404));
    }

    //validadando si el usuario que envia el dinero tiene saldo suficiente
    if (sendUser.amount < amount) {
      return next(new AppError('insufficient balance', 404));
    }

    //saldo de cuentas de los usuarios
    const balanceSenderUser = sendUser.amount - amount;
    const balanceReceiverUser = receiveUser.amount + amount;

    //actulizacion del balance
    await sendUser.update({ amount: balanceSenderUser });
    await receiveUser.update({ amount: balanceReceiverUser });

    //creamos el hitstorial de transferencia
    const newTransfer = await Transfers.create({
      senderUserId: sendUser.id,
      receiptUserId: receiveUser.id,
      amount,
    });

    //enviamos respuesta positiva
    res.status(200).json({
      status: 'success',
      newTransfer,
    });
  } catch (error) {
    next(error);
  }
};

//listado de tranferncias
const listTranfersUsers = async (req, res, next) => {
  try {
    const listTranfers = await Transfers.findAll();
    res.status(200).json({
      listTranfers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { transfer, listTranfersUsers };
