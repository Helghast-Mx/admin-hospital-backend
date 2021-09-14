/*
    Ruta : /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignUp } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');


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

module.exports = router;