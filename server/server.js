//impotamos los datos de app
const { app } = require('./App');

//importamos los datos de utils
const { db } = require('./utils/baseDatos');

//importamos los models
const { Account } = require('./models/accounter.models');
const { Transfers } = require('./models/tranfer.models');

//establecemos uniones
Account.hasMany(Transfers, {
  foreignKey: 'senderUserId',
});
Transfers.belongsTo(Account, {
  foreignKey: 'senderUserId',
});

//autenticacion de credenciales de base de datos
db.authenticate()
  .then(() => console.log('database authenticated'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('database sync'))
  .catch((err) => console.log(err));

// girar el servidor
const PORT = 7500;
app.listen(PORT, () => {
  console.log(`express app runngin on port: ${PORT}`);
});
