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

// Lectura y parseo del body
app.use( express.json( ) );

// Base de datos
dbConnection()

// mean_user
// WwSRIa5110KAmWoE
// console.log( process.env );

// Rutas
// todo lo que pase por esta ruta
                    // sera respondido por este archivo
app.use( '/api/usuarios', require('./routes/usuarios.routes') )
app.use( '/api/hospitales', require('./routes/hospitales.routes') )
app.use( '/api/medicos', require('./routes/medicos.routes') )
app.use( '/api/login', require('./routes/auth.routes') )
app.use( '/api/todo', require('./routes/busquedas.routes') )
app.use( '/api/upload', require('./routes/uploads.routes') )

// app.get( '/api/usuarios', (req, resp) =>{
//     resp.status(200).json({
//         ok: true,
//         msg: 'Hola mundo'
//     })
// } )

// Para levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})