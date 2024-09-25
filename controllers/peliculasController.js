
const db = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();


const getPeliculas = (req, res) => {
    db.query('SELECT * FROM peliculas', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const addPelicula = (req, res) => {
    const { titulo, descripcion, director, duracion, genero, clasificacion, poster } = req.body;
    const query = 'INSERT INTO peliculas (titulo, descripcion, director, duracion, genero, clasificacion, poster_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [titulo, descripcion, director, duracion, genero, clasificacion, poster], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Pelicula agregada', result });
    });
};

const deletePelicula = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM peliculas WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar la pelicula' });
            throw err;
        }
        res.json({ mensaje: 'Pelicula eliminada' });
    });
};

const updatePelicula = (req, res) => {
    const id = req.params.id;
    const { titulo, descripcion, duracion, director, genero, clasificacion } = req.body;

    connection.query('UPDATE peliculas SET ? WHERE id = ?', [{ titulo, descripcion, duracion, director, genero, clasificacion }, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar la película' });
            throw err;
        }
        res.json({ message: 'Película actualizada' });
    });
};

module.exports = { getPeliculas, addPelicula, deletePelicula, updatePelicula };