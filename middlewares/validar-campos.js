const { response } = require('express');
const { validationResult } = require('express-validator')


const validarCampos = (req, resp = response, next ) => {
 // cachear los errores que puede mandar la peticion
        // esto va a crear y almacenar un arreglo de errores en la req
        const errores = validationResult( req )

        if( !errores.isEmpty() ){
            return resp.status(400).json({
                ok:false,
                errors: errores.mapped()
            });
        }
        next();
} 

module.exports = {
    validarCampos
}