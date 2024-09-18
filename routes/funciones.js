
const express = require('express');
const router = express.Router();
const { getFunciones, addFuncion, deleteFuncion } = require('../controllers/funcionesController');

router.get('/', getFunciones);
router.post('/', addFuncion);
router.delete('/:id', deleteFuncion);

module.exports = router;