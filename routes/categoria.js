let express = require('express');
let app = express();

var Categoria = require('../modelos/categoria.js');


//=======================
//  Obtener Categoria
//=======================

app.get('/', (req, res , next) => {

    Categoria.find({}, 'nombre descripcion')
      .populate('usuario', 'nombre email')
      .exec(
        (err, categorias) => {
            if (err) {
              return res.status(500).json({
              ok: fañse,
              mensaje: 'La categoria no es correcto',
              errors: err
            });
            }
              res.status(200).json({
                ok: true,
                categorias: categorias
          });
    });


});
//=======================
//  actualizar Categoria
//=======================
app.put('/:id',(req, res) => {

	var id = req.params.id;
	var body =  req.body;

	Categoria.findById(id, (err, categoria) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error db al buscar categoria',
				errors: err
			});
		}

		if (!categoria) {

			return res.status(400).json({
				ok: false,
				mensaje: 'Error db id inexistente',
				errors: {message: 'no existe el categoria con ese id'}
			});

		}

		categoria.nombre = body.nombre,
		categoria.descripcion = body.descripcion,
    categoria.usuario = body.id,


		categoria.save( (err, categoriaGuardado) => {

			if (err)
      {
			return res.status(400).json({
				ok: false,
				mensaje: 'Error db al actualizar categoria',
				errors: err
				});
			}

			categoriaGuardado.password = ':)';

			res.status(200).json({
				ok:true,
				categoria: categoriaGuardado
			});
		});
	});
});








//=======================
//  crear Categoria
//=======================

app.post('/',(req, res) => {


	var body = req.body;

	var categoria = new Categoria({
		nombre: body.nombre,
		descripcion: body.descripcion,
    usuario: body.id,
		img: body.img,
	});

	categoria.save( (err, categoriaGuardado) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al crear categoria',
				errors: err
			});
		}

		res.status(201).json({
			ok:true,
			categoria: categoriaGuardado,
			categoriatoken: req.categoria
		});

	});


});


//====================================
//=======Borrar Categoria por id========
//====================================
app.delete('/:id', (req, res) => {
	var id =req.params.id;

	Categoria.findByIdAndRemove(id, (err,categoriaBorrado) => {

		if (err) {
			return res.status(500).json({
				ok: false,
				mensaje: 'Error al borrar categoria',
				errors: {message: 'No existe user con ese id'}
			});
		}

		if ( !categoriaBorrado) {
			return res.status(400).json({
				ok: false,
				mensaje: 'No existe user con ese id',
				errors: err
			});
		}

		res.status(200).json({
			ok:true,
			categoria: categoriaBorrado
		});
	});
});





module.exports = app;
