//Importar servicio de postgres
const ServicioPG = require('../services/pg')

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
 * Validar que se llenen todos los campos en el registro
 * @param {*} info 
 */

let validarInformacionRegistro = info => {
    if(!info.documento || !info.tipoDocumento || !info.nombres || !info.apellidos || !info.telefono || !info.email || !info.fechaNacimiento || !info.genero || !info.contraseña){
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
    let sql = `select nombres,apellidos,documento from usuarios where email = $1 and contraseña = $2;`
    let valores = [info.email,info.contraseña]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que inserta un nuevo usuario en la base de datos
 * @param {*} info 
 */
let registrarUsuario = async info => {
    let servicio = new ServicioPG()
    let sql = `insert into usuarios (documento, tipo_documento, nombres, apellidos, telefono, email, fecha_nacimiento, genero, md5(contraseña))
    values($1,$2,$3,$4,$5,$6,$7,$8,$9);`
    let valores = [info.documento,info.tipoDocumento,info.nombres,info.apellidos,info.telefono,info.email,info.fechaNacimiento,info.genero,info.contraseña]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

module.exports = {validarInformacionLogin,validarInformacionRegistro,validarLogin,registrarUsuario}