let express = require('express');
let app = express();

app.get('/', (req,res,next) => {
    res.status(200).json({
      ok: true,
      mensaje: 'peticion correcta categorias y productos'
    });
});


module.exports = app;
