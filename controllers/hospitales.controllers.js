const { response } = require('express')
const Hospital = require('../models/hospital.model')

const getHospitales = async(req, resp = response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre email') 

    resp.json({
        ok:true, 
        hospitales
    })
}

const crearHospital = async (req, resp = response) => {
    
    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    } )

    try {
        const hospitalGuardado = await hospital.save();
        resp.json({
            ok:true, 
            hospital: hospitalGuardado
        })
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

    
}

const actualizarHospital = async(req, resp = response) => {

    const hospitalID = req.params.id;
    const uidUsuario = req.uid

    try {
        // vemos si existe un hospital con ese id
         const hospitalDB = await Hospital.findById( hospitalID )

        if( !hospitalDB ){
            
            resp.status(400).json({
                ok: false, 
                msg: 'hospital no encontrado por id',
            })
        }
        
        // actualizar hospital
        //hospitalDB.nombre = req.body.nombre //esta es una manera 
        const cambiosHospital = {
            ...req.body,
            usuario : uidUsuario
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalDB, cambiosHospital, { new:true } )

        resp.status(200).json({
            ok: true, 
            msg: 'Hospital Actualizado',
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'no se pudo actualizar el hospital'
        })
    }

}

const borrarHospital = async (req, resp = response) => {

    const hospitalID = req.params.id;

    try {
        // vemos si existe un hospital con ese id
         const hospitalDB = await Hospital.findById( hospitalID )

        if( !hospitalDB ){
            
            resp.status(400).json({
                ok: false, 
                msg: 'hospital no encontrado por id',
            })
        }
        
       await Hospital.findByIdAndDelete( hospitalDB )

        // const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalDB, cambiosHospital, { new:true } )

        resp.status(200).json({
            ok: true, 
            msg: 'Hospital Borrado'
        })

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'no se pudo actualizar el hospital'
        })
    }
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}