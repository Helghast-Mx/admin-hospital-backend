/*
    ruta: '/api/todo/:id'
    coleccion ruta:
    '/api/todo/coleccion/medico/termino'
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jws-middleware');

const { getTodo, getPorColeccion } = require('../controllers/busquedas.controllers')

const router = Router();

            // no lo debemos ejecutar, solo debemos mandar referencia a la funcion
router.get( '/:busqueda', validarJWT, getTodo )
router.get( '/coleccion/:tabla/:busqueda', validarJWT, getPorColeccion )


module.exports = router;
