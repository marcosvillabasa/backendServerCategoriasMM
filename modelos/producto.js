let mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productoSchema = new Schema ({
  nombre: {type: String, required:[true, 'El nombre del producto es necesario']},
  descripcion: {type: String, required:[true, 'La descripcion del producto es necesaria']},
  imagen: {type: String, required: false},
  usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'El id de categoria es necesario']
  }
});

module.exports = mongoose.model('Producto', productoSchema);
