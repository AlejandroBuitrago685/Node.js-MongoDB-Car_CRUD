const mongoose  = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema({
  modelo: String,
  marca: String,
  color: String,
  anyo: String,
  matricula: String
});

module.exports  = mongoose.model('Coches', CarSchema);