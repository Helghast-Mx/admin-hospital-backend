/*
    Ruta : /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignUp, renewToken } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jws-middleware');


const router = Router();

router.post( '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post( '/google', 
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignUp
)

router.get( '/renew', 
    validarJWT,
    renewToken
)

module.exports = router;