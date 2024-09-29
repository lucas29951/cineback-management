const { con, pool } = require('../config/db');
const dotenv = require('dotenv');
const Pelicula = require('../models/Pelicula');

dotenv.config();

const getPeliculas = (req, res) => {
    con.query('SELECT * FROM peliculas', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las películas' });
            throw err;
        }

        const peliculas = results.map(pelicula => new Pelicula(
            pelicula.id,
            pelicula.titulo,
            pelicula.descripcion,
            pelicula.director,
            pelicula.duracion,
            pelicula.genero,
            pelicula.clasificacion,
            pelicula.poster_url
        ));

        res.json(peliculas);
    });
};

const addPelicula = (req, res) => {
    const { titulo, descripcion, director, duracion, genero, clasificacion, poster } = req.body;

    const nuevaPelicula = new Pelicula(null, titulo, descripcion, director, duracion, genero, clasificacion, poster);

    const query = 'INSERT INTO peliculas (titulo, descripcion, director, duracion, genero, clasificacion, poster_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
    con.query(query, [
        nuevaPelicula.titulo,
        nuevaPelicula.descripcion,
        nuevaPelicula.director,
        nuevaPelicula.duracion,
        nuevaPelicula.genero,
        nuevaPelicula.clasificacion,
        nuevaPelicula.poster_url
    ], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar la película' });
            throw err;
        }
        res.json({ message: 'Película agregada', result });
    });
};

const deletePelicula = (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM peliculas WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar la película' });
            throw err;
        }
        res.json({ message: 'Película eliminada' });
    });
};

const updatePelicula = (req, res) => {
    const id = req.params.id;
    const { titulo, descripcion, director, duracion, genero, clasificacion, poster } = req.body;

    const peliculaActualizada = new Pelicula(id, titulo, descripcion, director, duracion, genero, clasificacion, poster);

    con.query('UPDATE peliculas SET titulo = ?, descripcion = ?, director = ?, duracion = ?, genero = ?, clasificacion = ?, poster_url = ? WHERE id = ?', [
        peliculaActualizada.titulo,
        peliculaActualizada.descripcion,
        peliculaActualizada.director,
        peliculaActualizada.duracion,
        peliculaActualizada.genero,
        peliculaActualizada.clasificacion,
        peliculaActualizada.poster_url,
        peliculaActualizada.id
    ], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar la película' });
            throw err;
        }
        res.json({ message: 'Película actualizada' });
    });
};

module.exports = { getPeliculas, addPelicula, deletePelicula, updatePelicula };