const express = require('express')
const router = express.Router()
const {obtenerVideos} = require('../controllers/videos')

/**
 * Endpoint que trae las fotos de un lugar
 */
 router.get('/videos/:id',(req,res) => {
    let id = req.params.id
    obtenerVideos(id).then(respuesta => {
        res.send(respuesta.rows)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
    
})

module.exports = router;