const express = require('express');
const AuthController = require('../controllers/AuthController');
const AuthValidator = require('../validators/AuthValidator');
const { validationResult } = require('express-validator');


const router = express.Router();

router.post('/login', AuthValidator(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, AuthController.login);

router.get('/auth')


module.exports = router;



