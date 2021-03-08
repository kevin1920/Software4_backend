//Importar servicio de postgres
const ServicioPG = require('../services/pg')


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
 * Metodo que inserta un nuevo usuario en la base de datos
 * @param {*} info 
 */
let registrarUsuario = async info => {
    let servicio = new ServicioPG()
    let sql = `insert into usuarios (documento, tipo_documento, nombres, apellidos, telefono, email, fecha_nacimiento, genero, contraseña)
    values($1,$2,$3,$4,$5,$6,$7,$8,md5($9));`
    let valores = [info.documento,info.tipoDocumento,info.nombres,info.apellidos,info.telefono,info.email,info.fechaNacimiento,info.genero,info.contraseña]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

module.exports = {validarInformacionRegistro,registrarUsuario}