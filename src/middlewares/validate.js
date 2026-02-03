const { validationResult } = require('express-validator');

/**
 * Middleware de validation
 * Traite les erreurs de validation et les retourne en réponse
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }

  next();
};

module.exports = validate;
