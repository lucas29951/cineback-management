const { con, pool } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const registerUser = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new Usuario(null, nombre, email, hashedPassword, rol);

        await pool.query('INSERT INTO usuarios SET ?', {
            nombre: newUser.nombre,
            email: newUser.email,
            password: newUser.password,
            rol_id: newUser.rol_id
        });

        res.json({ message: 'Usuario registrado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const loggedUser = new Usuario(user[0].id, user[0].nombre, user[0].email, user[0].password, user[0].rol_id);

        const token = jwt.sign({ id: loggedUser.id, rol: loggedUser.rol_id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ user: loggedUser, token });
    } catch (err) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

const getUsers = (req, res) => {
    con.query('SELECT id, nombre, email, password, rol_id FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los usuarios' });
            throw err;
        }

        const usuarios = results.map(user => new Usuario(user.id, user.nombre, user.email, user.password, user.rol_id));
        
        res.json(usuarios);
    });
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const { nombre, email, rol } = req.body;

    const updatedUser = new Usuario(id, nombre, email, null, rol);

    con.query('UPDATE usuarios SET ? WHERE id = ?', [{
        nombre: updatedUser.nombre,
        email: updatedUser.email,
        rol_id: updatedUser.rol_id
    }, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar el usuario' });
            throw err;
        }
        res.json({ message: 'Usuario actualizado' });
    });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el usuario' });
            throw err;
        }
        res.json({ message: 'Usuario eliminado' });
    });
};

module.exports = { registerUser, loginUser, getUsers, updateUser, deleteUser };