const express = require('express');
const authValidation = require('../http/validators/authValidation');
const authController = require('../http/controllers/authController');

const router = express.Router();

router.post('/login',
    authValidation.checkValidity,
    authValidation.handleValidationErrors,
    authController.login
);

module.exports = router;



