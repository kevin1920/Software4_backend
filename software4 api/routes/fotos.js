const express = require('express')
const router = express.Router()
const {obtenerFotos} = require('../controllers/fotos')

/**
 * Endpoint que trae las fotos de un lugar
 */
 router.get('/fotos',(req,res) => {
    obtenerFotos().then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
    
})

module.exports = router;