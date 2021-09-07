const { response } = require('express')
const { generarJWT } = require('../helpers/jwt')

const bcryptj = require('bcryptjs')
const Usuario = require('../models/usuario.model')

const login = async ( req, resp = response ) => {

    const { email, password } = req.body

    try {


        // verificar si viene un email
        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB) {
            return resp.status(404).json({
                ok:false,
                msg: `Email o Contraseña no valida`
            })
        }

        // verificar si viene el password
                                // compara el password que la persona escribio
                                                        // con la contraseña de la base de datos
        const validarPassword = bcryptj.compareSync(password, usuarioDB.password)

        if( !validarPassword ) {
            return resp.status(400).json({
                ok: false,
                msg: `Contraseña no valida`
            })
        }

        // si llega a este punto debemos generar un TOKEN

        const token = await generarJWT( usuarioDB.id )
        resp.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: `Hable con el administrador`
        })
    }


}

module.exports = {
    login
}