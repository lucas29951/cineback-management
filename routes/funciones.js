
const express = require('express');
const router = express.Router();
const { getFunciones, addFuncion, deleteFuncion, updateFuncion, getFuncionesByPelicula } = require('../controllers/funcionesController');

router.get('/', getFunciones);
router.get('/:id', getFuncionesByPelicula);
router.post('/', addFuncion);
router.delete('/:id', deleteFuncion);
router.put('/:id', updateFuncion);

module.exports = router;