/*
    ruta: '/api/todo/coleccion/tipo/id'
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jws-middleware');

const { fileUpload, retornaImagen } = require('../controllers/uploads.controllers')

const router = Router();

// middleware que nos da acceso a los files
router.use(expressFileUpload());

            // no lo debemos ejecutar, solo debemos mandar referencia a la funcion
router.put( '/:tipo/:id', validarJWT, fileUpload )

router.get( '/:tipo/:foto',  retornaImagen )


module.exports = router;
