const { Schema, model } = require('mongoose')

// asi van a lucir nuestros usuarios en la BD
const UsuarioSchema = Schema ({

    nombre: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    img : {
        type: String
    },
    role : {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google : {
        type: String,
        default: false
    },
})
    // esto es solo de manera visual, no afecta a la BD
UsuarioSchema.method('toJSON', function(){
    // para obtener la instancia del objecto actual
    // de este objeto vamos a extraer varias cosas
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'Usuario', UsuarioSchema )