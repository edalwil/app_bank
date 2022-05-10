const { body, validationResult } = require('express-validator');

const createAccountValidator = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters'),
];

const createTransitionValidator = [
  body('receiveAccount')
    .notEmpty()
    .withMessage('receiveAccount cannot be empty')
    .isNumeric()
    .withMessage('receiveAccount is not date numeric '),
  body('amount')
    .notEmpty()
    .withMessage('please enter the technician id ')
    .isNumeric('amount is not date numeric'),
];

const ckeckValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join('. ');
    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

module.exports = {
  createAccountValidator,
  createTransitionValidator,
  ckeckValidator,
};
