
const express = require('express');
const router = express.Router();
const { getFunciones, addFuncion } = require('../controllers/funcionesController');

router.get('/', getFunciones);
router.post('/', addFuncion);

module.exports = router;