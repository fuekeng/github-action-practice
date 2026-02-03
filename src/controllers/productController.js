/**
 * Contrôleur des produits
 * Contient la logique métier pour la gestion des produits
 */

// Données temporaires (en prod, utiliser une base de données)
let products = [
  { id: 1, name: 'Laptop', price: 999.99, description: 'Powerful laptop' },
  { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' }
];

let nextId = 3;

/**
 * Récupérer tous les produits
 */
exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: products,
    count: products.length,
    message: 'Products retrieved successfully'
  });
};

/**
 * Récupérer un produit par ID
 */
exports.getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Product with ID ${id} not found`
    });
  }

  res.status(200).json({
    status: 'success',
    data: product,
    message: 'Product retrieved successfully'
  });
};

/**
 * Créer un nouveau produit
 */
exports.createProduct = (req, res) => {
  const { name, price, description } = req.body;

  // Validation basique
  if (!name || price === undefined) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Name and price are required'
    });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Price must be a positive number'
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    price,
    description: description || ''
  };

  products.push(newProduct);

  res.status(201).json({
    status: 'success',
    data: newProduct,
    message: 'Product created successfully'
  });
};

/**
 * Mettre à jour un produit
 */
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Product with ID ${id} not found`
    });
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Price must be a positive number'
      });
    }
    product.price = price;
  }
  if (description !== undefined) product.description = description;

  res.status(200).json({
    status: 'success',
    data: product,
    message: 'Product updated successfully'
  });
};

/**
 * Supprimer un produit
 */
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Product with ID ${id} not found`
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.status(200).json({
    status: 'success',
    data: deletedProduct[0],
    message: 'Product deleted successfully'
  });
};
