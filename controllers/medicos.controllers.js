const { response } = require('express')
const Medico = require('../models/medicos.model')

const getMedicos = async(req, resp = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre')
                                .populate('hospital', 'nombre')
    resp.json({
        ok:true, 
        medicos
    })
}

const crearMedico = async (req, resp = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })
    
    try {

        const medicoDB = await medico.save();
        resp.json({
            ok:true,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }

    resp.json({
        ok:true, 
        msg: 'crearMedico'
    })
}

const actualizarMedico = (req, resp = response) => {
    resp.json({
        ok:true, 
        msg: 'actualizarMedico'
    })
}

const borrarMedico = (req, resp = response) => {
    resp.json({
        ok:true, 
        msg: 'borrarMedico'
    })
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}