const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutasController');

// Obtener todas las rutas
router.get('/', rutaController.getAllRutas);
router.post('/', rutaController.createRuta);
router.post('/paquetes', rutaController.addPaqueteToRuta);
router.delete('/:id', rutaController.deleteRuta);

module.exports = router;