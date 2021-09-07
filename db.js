const mongoose = require('mongoose');
require('dotenv').config({ path: './dev.env' });

const usuario = process.env.DB_USER;
const password = process.env.DB_PASS;
const url = process.env.DB_HOST;
const dbName = "coches";

const uri = `mongodb://${usuario}:${password}@${url}`;

module.exports = connectToDatabase = () => {
   return  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Conexión a la base de datos correcta')) 
  .catch(e => console.log('Error de conexión con la base de datos', e))
}

