//Importar servicio de postgres
const ServicioPG = require('../services/pg')


/**
 * Metodo que obtiene las fotos de un lugar
 * @param {*} info 
 */
 let obtenerFotos = async idLugar => {
    let servicio = new ServicioPG()
    let sql = `select url from fotos where idLugar = $1;`
    let valores = [idLugar]
    let respuesta = await servicio.ejecutarSQL(sql,valores)
    return respuesta;
}

module.exports = {obtenerFotos}