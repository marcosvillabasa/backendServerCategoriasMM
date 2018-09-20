//primero los require, importacion de librerias que necesitamos

let express = require('express');
let mongoose = require('mongoose');


//inicializar varibles

let app = express();

//conexion a la DB
mongoose.connection.openUri('mongodb://localhost:27017/ProductosDB' , (err, res) =>{

    if(err)
      throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m' , 'online');
});


//importar rutas

app.get


//rutas


//excuchar peticiones

app.listen(3000, () => {
  console.log('Express server en el puerto: \x1b[32m%s\x1b[0m' , '3000');
});
