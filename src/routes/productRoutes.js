const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validate = require('../middlewares/validate');
const productValidator = require('../validators/productValidator');

// Récupérer tous les produits
router.get('/', productController.getAllProducts);

// Récupérer un produit par ID
router.get('/:id', productController.getProductById);

// Créer un produit
router.post(
  '/',
  productValidator.validateCreateProduct,
  validate,
  productController.createProduct
);

// Mettre à jour un produit
router.put(
  '/:id',
  productValidator.validateUpdateProduct,
  validate,
  productController.updateProduct
);

// Supprimer un produit
router.delete('/:id', productController.deleteProduct);

module.exports = router;
