
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        const [existingUser] = db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const hashedPassword = bcrypt.hash(password, 10);

        const newUser = { nombre, email, password: hashedPassword, rol };
        db.query('INSERT INTO usuarios SET ?', newUser);

        res.json({ message: 'Usuario registrado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user[0].id, rol: user[0].rol }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, user: { id: user[0].id, nombre: user[0].nombre, rol: user[0].rol } });
    } catch (err) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

const getUsers = (req, res) => {
    connection.query('SELECT id, nombre, email, rol FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los usuarios' });
            throw err;
        }
        res.json(results);
    });
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const { nombre, email, rol } = req.body;

    connection.query('UPDATE usuarios SET ? WHERE id = ?', [{ nombre, email, rol }, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar el usuario' });
            throw err;
        }
        res.json({ message: 'Usuario actualizado' });
    });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el usuario' });
            throw err;
        }
        res.json({ message: 'Usuario eliminado' });
    });
};

module.exports = { registerUser, loginUser, getUsers, updateUser, deleteUser };