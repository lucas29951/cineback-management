
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
    const { titulo, director, año } = req.body;
    const query = 'INSERT INTO peliculas (titulo, director, año) VALUES (?, ?, ?)';
    db.query(query, [titulo, director, año], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Pelicula agregada', result });
    });
};

const deletePelicula = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM peliculas WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar la pelicula' });
            throw err;
        }
        res.json({ mensaje: 'Pelicula eliminada' });
    });
};

module.exports = { getPeliculas, addPelicula, deletePelicula };