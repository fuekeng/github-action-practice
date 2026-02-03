/**
 * Middleware pour gérer les routes non trouvées (404)
 */
const notFound = (req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `Route not found: ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
};

module.exports = notFound;
