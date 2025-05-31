// b. Simular una base de datos en memoria
let users = [];

// c. Función para devolver todos los usuarios
const getAllUsers = (req, res) => {
  res.json(users);
};

// d, e, f, g. Función para crear un nuevo usuario con validación básica
const createUser = (req, res) => {
  const { name, email } = req.body;

  // Validación básica
  if (!name || !email) {
    return res
      .status(400)
      .json({ error: 'Nombre y correo electrónico son obligatorios.' });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

// h. Exportar funciones
module.exports = {
  getAllUsers,
  createUser,
};
