//importar librerias
const express = require('express')
const cors = require('cors')
require("./server/keys")

//inicializar la libreria
const app = express()
app.use(express.json())
app.use(cors())

//versiones
const vs = "/api/v1/"

//importar las rutas con los endpoints especificos
const rutasAutenticacion = require('./routes/autenticacion')
app.use(vs,rutasAutenticacion)

const rutasUsuarios = require('./routes/usuarios')
app.use(vs,rutasUsuarios)

const rutasLugares = require('./routes/lugares')
app.use(vs,rutasLugares)

const rutasRecorridos = require('./routes/recorridos')
app.use(vs,rutasRecorridos)

const rutasFotos = require('./routes/fotos')
app.use(vs,rutasFotos)

const rutasVideos = require('./routes/videos')
app.use(vs,rutasVideos)


//puerto
const port = process.env.PORT || 3000

//Levantar el servidor para escuchar los puertos
app.listen(port,() => {
    console.log(`Escuchando api en http://localhost:${port}`)
})