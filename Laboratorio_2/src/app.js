const express = require('express');
const userRoutes = require('./routes/user.routes');

// c. Crear instancia de la app
const app = express();

// d. Middleware para parsear JSON
app.use(express.json());

// e. Establecer la ruta base para usuarios
app.use('/users', userRoutes);

// f. Manejador para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// g. Exportar la app
module.exports = app;
