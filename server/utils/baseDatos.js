const Sequelize = require('sequelize'); //importamos la libreria Sequelize
const dotenv = require('dotenv'); //importamos la libreria dotenv

dotenv.config({ path: './config.env' });

//conexion con la base de datos
const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  logging: false,
});

module.exports = { db };
