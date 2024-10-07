const { check } = require('express-validator');


const AuthValidator = () => {
  return [
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'Introduce un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ];

};


module.exports = AuthValidator;
