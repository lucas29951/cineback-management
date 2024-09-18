
const express = require('express');
const router = express.Router();
const { getPeliculas, addPelicula, deletePelicula, updatePelicula } = require('../controllers/peliculasController');

router.get('/', getPeliculas);
router.post('/', addPelicula);
router.delete('/:id', deletePelicula);
router.put('/:id', updatePelicula);

module.exports = router;