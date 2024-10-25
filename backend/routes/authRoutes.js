const express = require('express');
const AuthController = require('../controllers/AuthController');
const AuthValidator = require('../validators/AuthValidator');
const { validationResult } = require('express-validator');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/login', AuthValidator(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, AuthController.login);

// Ruta protegida para obtener la información del usuario
router.get('/userinfo', AuthMiddleware, AuthController.getUserInfo);

module.exports = router;