const { response } = require('express')
const { generarJWT } = require('../helpers/jwt')

const bcryptj = require('bcryptjs')

const Usuario = require('../models/usuario.model')


const getUsuarios = async (req, resp) =>{

    // paginacion
    const desde = Number( req.query.desde ) || 0
    console.log(desde);


    const [usuarios, total] = await Promise.all([
        // ejecuta todas estas promesas
        // primera posicion del arreglo
        Usuario.find({}, 'nombre email password')
                .skip(desde)
                .limit( 5 ), 
        // segunda posicion del arreglo
        Usuario.count()
    ])

    resp.status(200).json({
        ok: true,
        usuarios,
        total
    })
}

const crearUsuarios = async (req, resp = response) =>{
    
    const { nombre, password, email, id  } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email})

        if(existeEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'el correo ya existe'
            })
        }

        // creamos una nueva instancia de nuestro modelo Usuario y le madamos como parametro lo que venga en el body de la peticion
        const usuario = new Usuario( req.body );

        //Encriptar contraseña
            // genera una data de manera aleatoria
        const salt = bcryptj.genSaltSync();
        usuario.password = bcryptj.hashSync( password, salt )


        // esperamos a que se resuelva para guardar en la bd
        await usuario.save()
        const token = await generarJWT(usuario.id);
    
        resp.status(200).json({
            ok: true,
            usuario,
            token
        })
       
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

const actualizarUsuario = async (req, resp = response) => {
    
        //TODO: validar toker y comprobar si el usuario es correcto

    const uid = req.params.id;
    

    try {
                // buscamos un usuario y le mandamos el uid porque nosotros asi lo definimos
        const usuarioDB = await Usuario.findById( uid )

        if( !usuarioDB ){
            return resp.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese ID'
            })
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

           
        if( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne( { email } );
            if( existeEmail ){
                return resp.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;
        // al hacer ...campos significa que los campos que defino antes no vendran en la req
        // delete campos.password;
        // delete campos.google;
                                                                            // siempre muestrame las ultimas actualizaciones
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } )


        resp.json({
            ok: true,
            usuario : usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async ( req, resp = response ) => {
    const uid = req.params.id;

    try {
        
         const usuarioDB = await Usuario.findById( uid )

         if( !usuarioDB ){
             return resp.status(404).json({
                 ok:false,
                 msg: 'No existe un usuario por ese ID'
             })
         }
         await Usuario.findByIdAndDelete( uid )

         resp.status(400).json({
            ok: true,
            msg: `usuario ${usuarioDB.nombre} eliminado`
        })
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}