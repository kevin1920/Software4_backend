//Importar servicio de postgres
const ServicioPG = require('../services/pg')


/**
 * Validar que se llenen todos los campos en el registro
 * @param {*} info 
 */

let validarInformacion = info => {
    if(!info.documento || !info.idLugar || !info.idLugar ){
        throw {
            ok:false, 
            mensaje:"Todos los campos son obligatorios"
        };
    }
}


/**
 * Metodo que inserta un recorrido en el historial
 * @param {*} info 
 */
let registrarRecorrido = async info => {
    let servicio = new ServicioPG()
    let sql = `insert into recorridos (documento, idLugar) values($1,$2);`
    let valores = [info.documento,info.idLugar]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que obtiene el historial de recorridos visitado por un usuario 
 * @param {*} info 
 */
 let obtenerHistorial = async id => {
    let servicio = new ServicioPG()
    let sql = `select recorridos.documento,lugares.nombre, lugares.imagen from recorridos inner join
    lugares on  lugares.id = recorridos.idLugar
    where documento = $1;`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}



module.exports = {validarInformacion,registrarRecorrido,obtenerHistorial}