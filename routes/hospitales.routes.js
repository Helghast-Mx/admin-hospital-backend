/*
    ruta: '/api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jws-middleware');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
    } = require('../controllers/hospitales.controllers')

const router = Router();

            // no lo debemos ejecutar, solo debemos mandar referencia a la funcion
router.get( '/', validarJWT, getHospitales )

// creacion de un hospital
router.post( '/', 
[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], 
crearHospital )

// actualizacion de registros PUT
router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],
actualizarHospital )

// borrar registros

router.delete( '/:id',
validarJWT,
borrarHospital 
);

module.exports = router;
