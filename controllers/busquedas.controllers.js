const { response } = require('express')
const Usuario = require('../models/usuario.model')
const Medico = require('../models/medicos.model')
const Hospital = require('../models/hospital.model')

const getTodo = async(req, resp = response) => {

    const busqueda = req.params.busqueda 
    const regex = new RegExp( busqueda, 'i' ); // la i indica que es insensible la expresion regular

    // const usuarios   = await Usuario.find({nombre: regex})
    // const medicos    = await Medico.find({nombre: regex})
    // const hospitales = await Hospital.find({nombre: regex})

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre: regex}),
    ])

    // const medicos = await Medico.find()
    //                             .populate('usuario', 'nombre')
    //                             .populate('hospital', 'nombre')
    resp.json({
        ok:true, 
        usuarios,
        medicos,
        hospitales
    })
}

const getPorColeccion = async(req, resp = response) => {

    const tabla    = req.params.tabla 
    const busqueda = req.params.busqueda 
    const regex    = new RegExp( busqueda, 'i' ); // la i indica que es insensible la expresion regular

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                                 .populate('usuario', 'nombre img')
                                 .populate('hospital', 'nombre img')
        break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                 .populate('usuario', 'nombre img')
        break;

        case 'usuarios':
           data = await Usuario.find({nombre: regex})
            
        break;
    
        default:
           return resp.status(400).json({
                ok:false,
                msg: 'La tabla debe ser usuarios ó medicos ó hospitales'
            });
    }

    resp.json({
        ok:true, 
        resultados: data
    })
}

module.exports = {
    getTodo,
    getPorColeccion
}