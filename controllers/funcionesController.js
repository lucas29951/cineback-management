const { con, pool } = require('../config/db');
const dotenv = require('dotenv');
const Funcion = require('../models/Funcion');

dotenv.config();

const getFunciones = (req, res) => {
    con.query('SELECT * FROM funciones', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las funciones' });
            throw err;
        }

        const funciones = results.map(funcion => new Funcion(
            funcion.id,
            funcion.id_pelicula,
            funcion.fecha,
            funcion.hora,
            funcion.sala,
            funcion.precio,
            funcion.asientos_disponibles
        ));

        res.json(funciones);
    });
};

const addFuncion = (req, res) => {
    const { id_pelicula, fecha, hora, sala, precio, asientos_disponibles } = req.body;

    const nuevaFuncion = new Funcion(null, id_pelicula, fecha, hora, sala, precio, asientos_disponibles);

    const query = 'INSERT INTO funciones (id_pelicula, fecha, hora, sala, precio, asientos_disponibles) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(query, [
        nuevaFuncion.id_pelicula,
        nuevaFuncion.fecha,
        nuevaFuncion.hora,
        nuevaFuncion.sala,
        nuevaFuncion.precio,
        nuevaFuncion.asientos_disponibles
    ], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar la función' });
            throw err;
        }
        res.json({ message: 'Función agregada', result });
    });
};

const deleteFuncion = (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM funciones WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar la función' });
            throw err;
        }
        res.json({ message: 'Función eliminada' });
    });
};

const updateFuncion = (req, res) => {
    const id = req.params.id;
    const { id_pelicula, fecha, hora, sala, precio, asientos_disponibles } = req.body;

    const funcionActualizada = new Funcion(id, id_pelicula, fecha, hora, sala, precio, asientos_disponibles);

    const query = 'UPDATE funciones SET id_pelicula = ?, fecha = ?, hora = ?, sala = ?, precio = ?, asientos_disponibles = ? WHERE id = ?';
    con.query(query, [
        funcionActualizada.id_pelicula,
        funcionActualizada.fecha,
        funcionActualizada.hora,
        funcionActualizada.sala,
        funcionActualizada.precio,
        funcionActualizada.asientos_disponibles,
        funcionActualizada.id
    ], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar la función' });
            throw err;
        }
        res.json({ message: 'Función actualizada' });
    });
};

module.exports = { getFunciones, addFuncion, deleteFuncion, updateFuncion };