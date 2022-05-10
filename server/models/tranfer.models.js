//importamos dato de la base de datos
const { db } = require('../utils/baseDatos');

//esportamos DataTypes para que los valores sean leidos.
const DataTypes = require('sequelize');

const Transfers = db.define('transfers', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiptUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Transfers };
