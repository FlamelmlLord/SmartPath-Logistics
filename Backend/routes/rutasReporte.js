const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

// Obtener reporte completo de rutas
router.get('/', reporteController.getReporte);

module.exports = router;