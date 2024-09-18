
const db = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();


const getFunciones = (req, res) => {
    db.query('SELECT * FROM funciones', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const addFuncion = (req, res) => {
    const { id_pelicula, fecha, hora, sala, precio, asientos_disponibles } = req.body;
    const query = 'INSERT INTO funciones (id_pelicula, fecha, hora, sala, precio, asientos_disponibles) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [id_pelicula, fecha, hora, sala, precio, asientos_disponibles], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Funcion agregada', result });
    });
};

const deleteFuncion = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM funciones WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar la funcion' });
            throw err;
        }
        res.json({ mensaje: 'Funcion eliminada' });
    });
};

module.exports = { getFunciones, addFuncion, deleteFuncion };