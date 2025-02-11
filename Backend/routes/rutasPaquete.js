const express = require('express');
const router = express.Router();
const paqueteController = require('../controllers/paquetesController');

// Obtener todos los paquetes
router.get('/', paqueteController.getAllPaquetes);
router.post('/', paqueteController.createPaquete);
router.put('/:rastreo', paqueteController.updatePaquete);
router.delete('/:rastreo', paqueteController.deletePaquete);

module.exports = router;