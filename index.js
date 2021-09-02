// busca las varibales de entorno en un archivo con la extencion .env
require('dotenv').config();
// importamos express
const express = require('express');
// importamos la conexion con 
const { dbConnection } = require('./database/config');
// importacion del cors
const cors = require('cors')

// Creando el servidor express
const app = express();

// configuracion del cors
    //el use es un middleweb que indica que cada que pase por aqui se ejecutara de este punto hacia abajo
app.use( cors() )

// Base de datos
dbConnection()

// mean_user
// WwSRIa5110KAmWoE
// console.log( process.env );

// Rutas
app.get( '/', (req, resp) =>{
    resp.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    })
} )

// Para levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})