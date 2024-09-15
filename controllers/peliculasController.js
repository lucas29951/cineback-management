
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

module.exports = { getPeliculas, addPelicula };