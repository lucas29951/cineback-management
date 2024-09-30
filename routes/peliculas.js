
const express = require('express');
const router = express.Router();
const { getPeliculas, addPelicula, deletePelicula, updatePelicula, getPeliculaByID } = require('../controllers/peliculasController');

router.get('/', getPeliculas);
router.get('/:id', getPeliculaByID);
router.post('/', addPelicula);
router.delete('/:id', deletePelicula);
router.put('/:id', updatePelicula);

module.exports = router;