
const express = require('express');
const router = express.Router();
const { getPeliculas, addPelicula, deletePelicula } = require('../controllers/peliculasController');

router.get('/', getPeliculas);
router.post('/', addPelicula);
router.delete('/:id', deletePelicula);

module.exports = router;