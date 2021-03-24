const express = require('express')
const router = express.Router()
const {obtenerHistorial,registrarRecorrido, validarInformacion} = require('../controllers/recorridos')

/**
 * Endpoint que registra un recorrido visitado
 */
router.post('/recorridos',(req,res) => {
    try {
        validarInformacion(req.body)
        registrarRecorrido(req.body).then(respuesta => {
            res.status(200).send({ok:true})
        }).catch(error => {
            console.log(error)
            res.status(500).send(error);
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

/**
 * Endpoint que trae el historial de recorridos
 */
router.get('/recorridos/:id',(req,res) => {
    let id = req.params.id
    obtenerHistorial(id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
    
})


module.exports = router;