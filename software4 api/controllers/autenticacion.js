//Importar servicio de postgres
const ServicioPG = require('../services/pg')
const jwt = require('jsonwebtoken')

let secret_key = process.env.SECRET_KEY


/**
 * Validar que se llenen todos los campos del login
 * @param {*} info 
 */

let validarInformacionLogin = info => {
    if(!info.email || !info.contraseña){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}

/**
 * Metodo que verifica el email y la clave en la base de datos
 * @param {*} info 
 */
let validarLogin = async info => {
    let servicio = new ServicioPG()
    let sql = `select nombres,apellidos,documento from usuarios where email = $1 and contraseña = md5($2);`
    let valores = [info.email,info.contraseña]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que genera el token 
 * @param {*} usuario 
 */
let generarToken = (usuario) => {
    delete usuario.contraseña;
    let token = jwt.sign(usuario,secret_key)
    return token;
}

/**
 * Metodo que verifica el token
 * @param {*} token 
 */
let verificarToken = token => {
    return jwt.verify(token,secret_key);
}

module.exports = {validarInformacionLogin,validarLogin,generarToken,verificarToken}