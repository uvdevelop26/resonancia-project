const express = require('express');
const authValidation = require('../http/validators/authValidation'); 
const handleValidationErrors = require('../http/middlewares/handleValidationErrors'); // Importar manejo de errores
const authController = require('../http/controllers/authController');

const router = express.Router();

router.post('/login', authValidation, handleValidationErrors, authController.login);

module.exports = router;



