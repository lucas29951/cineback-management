
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

module.exports = { registerUser };