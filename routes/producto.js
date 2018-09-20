let express = require('express');
let app = express();

var Producto = require('../modelos/producto.js');


//=======================
//  Obtener producto
//=======================

app.get('/', (req, res , next) => {

    Producto.find({}, 'nombre descripcion usuario categoria')
      .exec(
        (err, productos) => {
            if (err) {
              return res.status(500).json({
              ok: fañse,
              mensaje: 'El producto no es correcto',
              errors: err
            });
            }
              res.status(200).json({
                ok: true,
                productos: productos
          });
    });


});
//=======================
//  actualizar producto
//=======================
app.put('/:id',(req, res) => {

	var id = req.params.id;
	var body =  req.body;

	Producto.findById(id, (err, producto) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error db al buscar producto',
				errors: err
			});
		}

		if (!producto) {

			return res.status(400).json({
				ok: false,
				mensaje: 'Error db id inexistente',
				errors: {message: 'no existe el producto con ese id'}
			});

		}

		producto.nombre = body.nombre,
		producto.descripcion = body.descripcion,
		producto.usuario = body.id,
    producto.categoria = body.idCat,

		producto.save( (err, productoGuardado) => {

			if (err)
      {
			return res.status(400).json({
				ok: false,
				mensaje: 'Error db al actualizar producto',
				errors: err
				});
			}

			productoGuardado.password = ':)';

			res.status(200).json({
				ok:true,
				producto: productoGuardado
			});
		});
	});
});








//=======================
//  crear producto
//=======================

app.post('/',(req, res) => {


	var body = req.body;

	var producto = new Producto({
		nombre: body.nombre,
		descripcion: body.descripcion,
		img: body.img,
		usuario: body.id,
    categoria: body.idCat,
	});

	producto.save( (err, productoGuardado) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al crear producto',
				errors: err
			});
		}

		res.status(201).json({
			ok:true,
			producto: productoGuardado,
			productotoken: req.producto
		});

	});


});


//====================================
//=======Borrar Producto por id========
//====================================
app.delete('/:id', (req, res) => {
	var id =req.params.id;

	Producto.findByIdAndRemove(id, (err,productoBorrado) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al borrar producto',
				errors: {message: 'No existe user con ese id'}
			});
		}

		if ( !productoBorrado) {
			return res.status(400).json({
				ok: false,
				mensaje: 'No existe user con ese id',
				errors: err
			});
		}

		res.status(200).json({
			ok:true,
			producto: productoBorrado
		});
	});
});





module.exports = app;
