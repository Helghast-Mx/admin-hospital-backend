const jwt = require('jsonwebtoken')


const generarJWT = ( uid ) => {
    // tenemos que transformar esto en una promesa

    return new Promise( (resolve, reject) =>{

        // en el payload podemos grabar lo que sea siempre y cuando no venga informacion sensible
        const payload = {
            uid
        }
         // payload | palabra secreta | tiempo en expirar, callback (err, token)
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '10h'
        }, (err, token) => {

            if(err){
                console.log(err);
                reject('no se pudo generar el JWT')
            } else {
                resolve( token )
            }

        })

    } )
}

module.exports = {
    generarJWT
}