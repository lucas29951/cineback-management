
const express = require('express');
const router = express.Router();
const { getFunciones, addFuncion, deleteFuncion, updateFuncion } = require('../controllers/funcionesController');

router.get('/', getFunciones);
router.post('/', addFuncion);
router.delete('/:id', deleteFuncion);
router.put('/:id', updateFuncion);

module.exports = router;