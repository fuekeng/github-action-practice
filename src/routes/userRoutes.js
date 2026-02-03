const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const userValidator = require('../validators/userValidator');

// Récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Récupérer un utilisateur par ID
router.get('/:id', userController.getUserById);

// Créer un utilisateur
router.post(
  '/',
  userValidator.validateCreateUser,
  validate,
  userController.createUser
);

// Mettre à jour un utilisateur
router.put(
  '/:id',
  userValidator.validateUpdateUser,
  validate,
  userController.updateUser
);

// Supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;
