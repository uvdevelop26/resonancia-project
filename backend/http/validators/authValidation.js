const { check } = require('express-validator');
const { validationResult } = require('express-validator');


const authValidation = {
  checkValidity: [
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'Introduce un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ],

  handleValidationErrors: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
};


module.exports = authValidation;
