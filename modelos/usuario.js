let mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol valido'
}

var usuarioSchema = new Schema({
  nombre: {type: String, required: [true, 'El nombre es necesario']},
  email: {type: String, unique: true, required: [true, 'El email es necesario']},
  password: {type:String, required: false},
  img: {type: String},
  role: {type: String, required: true, default: 'USER_ROLE', enum: rolesValidos}

});

usuarioSchema.plugin(uniqueValidator, { message: 'El correo debe ser unico'});

module.exports= mongoose.model( 'Usuario', usuarioSchema);
