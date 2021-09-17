const { response } = require('express')
const { generarJWT } = require('../helpers/jwt')

const bcryptj = require('bcryptjs')
const Usuario = require('../models/usuario.model')
const { googleVerify } = require('../helpers/google-verify')

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

const googleSignUp = async ( req, resp = response ) => {

    // reciviendo el token del body de la peticion
    const googleToken = req.body.token
    console.log(googleToken);

    try {

        const { name, email, picture } = await googleVerify( googleToken )
        
        // verificar si existe un usuario en la bd con ese email
        const usuarioDB = await Usuario.findOne({email});

        // si el usuario no existe, creamos uno nuevo
        let usuario;
        if( !usuarioDB ){
            usuario= new Usuario ( {
                nombre: name,
                email,
                password:'@@@',
                img: picture,
                google : true
            })
        } else {
            // si existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@'

        }

        // guardar en BD
        await  usuario.save();

        const token = await generarJWT( usuario.id )

        resp.json({
            ok: true,
            token
        })

    } catch (error) {
        resp.status(400).json({
            ok: false,
            msg: 'token no es correcto'
        })
    }

    
}

const renewToken = async ( req, resp = response ) => {

    const uid = req.uid

    // Generar el TOKEN -JWT
    const token = await generarJWT( uid )

    resp.json({
        ok: true,
        token
    })

}

module.exports = {
    login,
    googleSignUp,
    renewToken
}