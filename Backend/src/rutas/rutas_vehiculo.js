const express = require('express');
const { crear_vehiculo } = require('../controladores/controlador_vehiculo');
const { obtener_ubicaciones } = require('../controladores/controlador_ubicaciones');
const rutas = express.Router(); 

// localhost:3000/vehiculos/crear
rutas.post("/crear", crear_vehiculo);

// localhost:3000/vehiculos/ubicaciones
rutas.get("/ubicaciones", obtener_ubicaciones);

module.exports = rutas;