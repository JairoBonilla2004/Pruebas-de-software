const express = require('express');

// Crea un router nuevo con Express para definir rutas específicas de usuarios
const router = express.Router();

// Importar las funciones del controlador que manejan la lógica para usuarios:

const { getAllUsers, createUser } = require('../controllers/user.controller');

// Cuando se haga GET a /users, se ejecuta getAllUsers
router.get('/', getAllUsers);

// Cuando se haga POST a /users, se ejecuta createUser
router.post('/', createUser);

// Exporta el router para que pueda ser utilizado en la aplicación principal (app.js)
module.exports = router;
