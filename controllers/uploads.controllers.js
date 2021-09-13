const path = require('path');
const fs = require('fs')

const { response } = require('express')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async( req, resp = response )=> {

    const tipo = req.params.tipo
    const id   = req.params.id

    // primero debemos configurar el path del archivo a subir
    // validamos el tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios']

    if( !tiposValidos.includes(tipo) ){
        return resp.status(400).json({
            ok: false,
            msg: 'el tipo seleccionado no es medico, usuario u hospital'
        })
    }
    // validamos si existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
      }

    //   Procesar la imagen
                // tenemos acceso a los files gracias al middleware 
                    // el imagen es el nombre que establecimos en postman
    const file = req.files.imagen


    // extraer la extension del archivo

    const nombreCortado = file.name.split('.'); //cortamos el nombre por arreglos
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ] //agarramos el ultimo arreglo que en este caso seria la extension
    
    // validar extension

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if( !extensionesValidas.includes( extensionArchivo ) ){
        return resp.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // moviendo la imagen a donde queremos
    file.mv(path, (err) => {
      if (err){
          console.log(err);
          return res.status(500).json({
              ok: false,
              msg: 'Error al mover la imagen'
          })
      }

    //   Actualizar imagen
    actualizarImagen( tipo, id, nombreArchivo );


      resp.json({
        ok: true,
        msg: 'archivo subido',
        nombreArchivo
    })
    });
    
}

// Observar imagen 

const retornaImagen = ( req, resp = response ) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` )

    // imagen por defecto

    if( fs.existsSync( pathImg ) ){
        
        resp.sendFile(pathImg)
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-image-found.png` )
        resp.sendFile(pathImg)
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}