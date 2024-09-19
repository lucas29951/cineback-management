
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/usuariosController');

router.post('/register', registerUser);

module.exports = router;