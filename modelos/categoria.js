let mongoose = require ('mongoose');
let uniqueValidator = require ('mongoose-unique-validator');

var Schema = mongoose.Schema;

var categoriaSchema = new Schema ({
  nombre: {type: String, required:[true, 'El nombre de categoria es necesario']},
  descripcion: {type: String, required:[true, 'La descripcion de categoria es necesario']},
  imagen: {type: String, required: false},
  usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id de usuario es necesario']}
},{collection: 'categorias'});

module.exports = mongoose.model('Categoria', categoriaSchema);
