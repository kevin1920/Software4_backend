//Importar servicio de postgres
const ServicioPG = require('../services/pg')

/**
 * Metodo que obtiene los lugares de la base de datos
 */
let obtenerLugares = async () => {
    let servicio = new ServicioPG()
    let sql = `select id,imagen,nombre,lat,long from lugares;`
    let respuesta = await servicio.ejecutarSQL(sql)
    return respuesta;
}

/**
 * Metodo que obtiene un lugar en especifico 
 * @param {*} info 
 */
let obtenerLugarEspecifico = async id => {
    let servicio = new ServicioPG()
    let sql = `select id,imagen,nombre,lat,long from lugares where id = $1;`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

/**
 * Metodo que ontiene la latitud y longitud
 */
let obtenerCoordenadas = async id => {
    let servicio = new ServicioPG()
    let sql = `select long, lat from lugares where id = $1;`
    let valores = [id]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

module.exports = {obtenerLugares,obtenerLugarEspecifico,obtenerCoordenadas}