const express = require('express');
const router = express.Router();
const controller = require('../controllers/conductoresController');

router.get('/', controller.getAllConductores);
router.post('/', controller.createConductor);
router.put('/:documento', controller.updateConductor);
router.delete('/:documento', controller.deleteConductor);

module.exports = router;