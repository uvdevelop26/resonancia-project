
const express = require('express');
const userController = require('../http/controllers/userController');
const userValidation = require('../http/validators/userValidation');


const router = express.Router();

router.get('/users', userController.userIndex);

router.get('/users/create', userController.userCreate);

router.post('/users/store',
    userValidation.checkValidity,
    userValidation.handleValidationErrors,
    userController.userStore
);

router.get('/users/edit/:slug', userController.userEdit);

router.put('/users/update/:slug', userController.userUpdate);

router.delete('/users/delete/:id', userController.userDelete);

module.exports = router;
