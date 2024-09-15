
const express = require('express');
const router = express.Router();
const { getPeliculas, addPelicula } = require('../controllers/peliculasController');

router.get('/', getPeliculas);
router.post('/', addPelicula);

module.exports = router;