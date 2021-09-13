const fs = require('fs') 

const Usuario = require('../models/usuario.model')
const Medico = require('../models/medicos.model')
const Hospital = require('../models/hospital.model')

const borrarImagen = ( path ) =>{
    if( fs.existsSync( path ) ){
        //    borra la imagen anterior
        fs.unlinkSync( path )
       }
}


const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    
    let pathViejo;

    switch ( tipo ) {
        case 'medicos':
           const medico = await Medico.findById(id)
        
           if( !medico ) {
               console.log('medico no existe');     
               return false
           }
        //    evaluar si el medico tiene una previa imagen guardada, si, si hay hay que borrarla
           pathViejo = `./uploads/medicos/${ medico.img }`;
           borrarImagen( pathViejo )
           
        //    establecemos a la instancia que buscamos, le establecemos la img
           medico.img = nombreArchivo
           await medico.save();
           return true;
        

        case 'hospitales':
            const hospital = await Hospital.findById(id)
        
            if( !hospital ) {
                console.log('hospital no existe');     
                return false
            }
            //    evaluar si el medico tiene una previa imagen guardada, si, si hay hay que borrarla
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo )
            
            //    establecemos a la instancia que buscamos, le establecemos la img
            hospital.img = nombreArchivo
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id)
        
            if( !usuario ) {
                console.log('Usuario no existe');     
                return false
            }
            //    evaluar si el medico tiene una previa imagen guardada, si, si hay hay que borrarla
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo )
            
            //    establecemos a la instancia que buscamos, le establecemos la img
            usuario.img = nombreArchivo
            await usuario.save();
            return true;
            
        break;
    
        default:
           return resp.status(400).json({
                ok:false,
                msg: 'La tabla debe ser usuarios ó medicos ó hospitales'
            });
    }


}

module.exports = {
    actualizarImagen
}