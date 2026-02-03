/**
 * Contrôleur des utilisateurs
 * Contient la logique métier pour la gestion des utilisateurs
 */

// Données temporaires (en prod, utiliser une base de données)
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

let nextId = 3;

/**
 * Récupérer tous les utilisateurs
 */
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: users,
    count: users.length,
    message: 'Users retrieved successfully'
  });
};

/**
 * Récupérer un utilisateur par ID
 */
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `User with ID ${id} not found`
    });
  }

  res.status(200).json({
    status: 'success',
    data: user,
    message: 'User retrieved successfully'
  });
};

/**
 * Créer un nouvel utilisateur
 */
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  // Validation basique
  if (!name || !email) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Name and email are required'
    });
  }

  const newUser = {
    id: nextId++,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    status: 'success',
    data: newUser,
    message: 'User created successfully'
  });
};

/**
 * Mettre à jour un utilisateur
 */
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `User with ID ${id} not found`
    });
  }

  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json({
    status: 'success',
    data: user,
    message: 'User updated successfully'
  });
};

/**
 * Supprimer un utilisateur
 */
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `User with ID ${id} not found`
    });
  }

  const deletedUser = users.splice(index, 1);

  res.status(200).json({
    status: 'success',
    data: deletedUser[0],
    message: 'User deleted successfully'
  });
};
