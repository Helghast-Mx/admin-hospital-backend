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

const actualizarMedico = async (req, resp = response) => {

    const idMedico = req.params.id;
    const uidUsuario = req.uid //esto viene del token


    try {

        // vemos si existe un medico con ese id
        const medicoDB = await Medico.findById( idMedico )
        
        if( !medicoDB ){
             resp.status(400).json({
                 ok: false, 
                 msg: 'no se encontro un Medico con ese ID',
             })
         }
        
         // actualizar medico
         //medicoDB.nombre = req.body.nombre //esta es una manera 
         const cambiosMedico = {
             ...req.body,
             usuario : uidUsuario
         }

        const medicoActualizado = await Medico.findByIdAndUpdate( medicoDB, cambiosMedico, { new:true } )

        resp.status(200).json({
            ok: true, 
            msg: 'Medico Actualizado',
            medico: medicoActualizado
        })
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'no se pudo actualizar el medico'
        })
    }

}

const borrarMedico = async (req, resp = response) => {

    const idMedico = req.params.id;


    try {

        // vemos si existe un medico con ese id
        const medicoDB = await Medico.findById( idMedico )
        

        if( !medicoDB ){
            
             resp.status(400).json({
                 ok: false, 
                 msg: 'no se encontro un Medico con ese ID',
             })
         }
        
        await Medico.findByIdAndDelete( medicoDB )

        resp.status(200).json({
            ok: true, 
            msg: 'Medico Borrado'
        })
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'no se pudo actualizar el medico'
        })
    }
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}