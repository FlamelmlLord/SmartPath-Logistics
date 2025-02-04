const express = require('express');
const { crear_vehiculo } = require('../controladores/controlador_vehiculo');
const rutas = express.Router(); 

// localhost:3000/vehiculos/crear
rutas.post("/crear", crear_vehiculo);


// localhost:3000/vehiculos/obtener
// rutas.get("/obtener", crear_vehiculo);


module.exports = rutas;
