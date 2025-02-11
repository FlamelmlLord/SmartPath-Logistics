const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculosController');

// Obtener todos los vehículos
router.get('/', vehiculoController.getAllVehiculos);
router.post('/', vehiculoController.createVehiculo);
router.put('/:placa', vehiculoController.updateVehiculo);
router.delete('/:placa', vehiculoController.deleteVehiculo);

module.exports = router;