const jwt = require('jsonwebtoken')
const { response } = require('express')

const validarJWT = (req, resp = response, next) => {

    // leer el Token de los headers
    const token = req.header('x-token');
    console.log(token);

    // verificar el token

    if( !token ){
        return resp.status(401).json({
            ok: false, 
            msg: 'no hay token en la peticion'
        })
    }

    try {
                                    // Aqui se comprueba si hacen macht la firma con la que tenemos registrada
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        
        
    } catch (error) {
        console.log(error);
        return resp.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }

    next();

}


module.exports = {
    validarJWT
}