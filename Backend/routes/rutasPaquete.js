const express = require('express');
const router = express.Router();
const paqueteController = require('../controllers/paquetesController');

// Obtener todos los paquetes
router.get('/', paqueteController.getAllPaquetes);

// Crear nuevo paquete
router.post('/', paqueteController.createPaquete);

// Actualizar paquete por número de rastreo
router.put('/:rastreo', paqueteController.updatePaquete);

// Eliminar paquete por número de rastreo
router.delete('/:rastreo', paqueteController.deletePaquete);

module.exports = router;