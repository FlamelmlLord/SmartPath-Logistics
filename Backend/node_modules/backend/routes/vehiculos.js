const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');

router.get('/', vehiculosController.getAllVehiculos);
router.post('/', vehiculosController.createVehiculo);

module.exports = router;