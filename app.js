//primero los require, importacion de librerias que necesitamos

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');


//inicializar varibles

let app = express();

//bosy bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conexion a la DB
mongoose.connection.openUri('mongodb://localhost:27017/ProductosDB' , (err, res) =>{

    if(err)
      throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m' , 'online');
});


//importar rutas

var appRoutes = require('./routes/app.js');
var usuarioRoutes = require('./routes/usuario.js');
var categoriaRoutes = require('./routes/categoria.js');
var productoRoutes = require('./routes/producto.js');


//rutas declaramos el middleware
app.use('/producto', productoRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);


//excuchar peticiones

app.listen(3000, () => {
  console.log('Express server en el puerto: \x1b[32m%s\x1b[0m' , '3000');
});
