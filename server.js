
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const peliculasRoutes = require('./routes/peliculas');
const funcionesRoutes = require('./routes/funciones');
const usuariosRoutes = require('./routes/usuarios');


dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/peliculas', peliculasRoutes);
app.use('/api/funciones', funcionesRoutes);
app.use('/api/usuarios', usuariosRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});