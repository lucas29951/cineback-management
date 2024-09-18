
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

const getPeliculas = (req, res) => {
    connection.query('SELECT * FROM peliculas', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const addPelicula = (req, res) => {
    const { titulo, director, año } = req.body;
    const query = 'INSERT INTO peliculas (titulo, director, año) VALUES (?, ?, ?)';
    connection.query(query, [titulo, director, año], (err, result) => {
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