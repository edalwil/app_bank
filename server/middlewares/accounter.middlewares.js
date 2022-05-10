const { Account } = require('../models/accounter.models'); //importamos  datos del modal
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    let token;
    //confirmar si token estar en header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      //quitamos bearer del token
      token = req.headers.authorization.split(' ')[1];
    }

    //confirmar si el token existe
    if (!token) {
      res.status(403).json({
        status: 'error',
        message: 'credentials invalid',
      });
    }

    //verificar token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //retornar variable decoded
    const user = await Account.findOne({
      where: { id: decoded.id, status: 'active' },
    });

    if (!user) {
      res.status(200).json({
        status: 'error',
        message: 'the owner of this token is no loger available',
      });
    }

    req.sessisioUser = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateToken };
