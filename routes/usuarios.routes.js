/*
    Ruta : /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jws-middleware');

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');

const router = Router();

            // no lo debemos ejecutar, solo debemos mandar referencia a la funcion
router.get( '/', validarJWT, getUsuarios )

// creacion de un usuario
    // el segundo argumento es un middleweb
router.post( '/', 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], 
crearUsuarios )

// actualizacion de registros PUT
router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    // check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
],
actualizarUsuario )

// borrar registros

router.delete( '/:id',
validarJWT,
borrarUsuario 
);

module.exports = router;
