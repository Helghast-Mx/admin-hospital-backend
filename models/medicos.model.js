const { Schema, model } = require('mongoose')

// asi van a lucir nuestros usuarios en la BD
const MedicoSchema = Schema ({

    nombre: {
        type: String,
        required: true
    },
    img : {
        type: String
    },
    usuario: {
        // Indica a moongose que habrá una relacion entre este documento con
        type: Schema.Types.ObjectId,
        // el esquema de esta referencia
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
        // si queremos cambiar el nombre de como se visualizara en la BD
}, {collection: 'medicos'})


    // esto es solo de manera visual, no afecta a la BD
MedicoSchema.method('toJSON', function(){
    // para obtener la instancia del objecto actual
    // de este objeto vamos a extraer varias cosas
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Medico', MedicoSchema )