/*
    ruta: '/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jws-middleware');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
                } = require('../controllers/medicos.controllers')

const router = Router();

            // no lo debemos ejecutar, solo debemos mandar referencia a la funcion
router.get( '/', validarJWT, getMedicos )

// creacion de un medico
router.post( '/', 
[
    validarJWT,
    check('nombre', "El nombre del medico es necesario").not().isEmpty(),
    check('hospital', "El hospital ID debe ser valido").isMongoId(),
    validarCampos
], 
crearMedico )

// actualizacion de registros PUT
router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', "El hospital ID debe ser valido").isMongoId(),
    validarCampos
],
actualizarMedico )

// borrar registros

router.delete( '/:id',
validarJWT,
borrarMedico 
);

module.exports = router;
