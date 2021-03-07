const express = require('express')
const router = express.Router()
const {validarInformacionLogin,validarInformacionRegistro,validarLogin, registrarUsuario} = require('../controllers/usuarios')

/**
 * Endpoint que envia la identificacion o el correo y la contraseña para hacer el login
 */
router.post('/login',(req,res) => {
    try {
        validarInformacionLogin(req.body)
        validarLogin(req.body).then(respuesta => {
            if(respuesta.rowCount > 0){
                res.status(200).send({ok:true, mensaje:"inicio de sesion correcto", usuario:respuesta.rows[0]})
            }else{
                res.send({ok:false, mensaje:"Email y/o contraseña incorrecta", info: {}})
            }
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