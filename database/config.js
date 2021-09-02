// configuracion de moongose
const mongoose = require('mongoose');

// funcion que sea la encargada de hacer la conexion

const dbConnection = async () =>{

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('error al iniciar la BD');
    }


}

module.exports = {
    dbConnection
}