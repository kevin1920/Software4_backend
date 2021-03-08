const express = require('express')
const router = express.Router()
const {validarInformacionRegistro, registrarUsuario} = require('../controllers/usuarios')


/**
 * Endpoint que envia los datos de un usuario para ser registrado
 */
router.post('/registro',(req,res) => {
    try {
        validarInformacionRegistro(req.body)
        registrarUsuario(req.body).then(respuesta => {
            res.status(200).send({ok:true, mensaje:"Usuario registrado exitosamente",info:respuesta.rows})
        }).catch(error => {
            console.log(error)
            res.status(500).send(error);
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;