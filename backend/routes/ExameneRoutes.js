const express = require('express');
const ExameneController = require('../controllers/ExameneController');
const ExameneValidator = require('../validators/ExameneValidator');
const { validationResult } = require('express-validator');
const { configMulter } = require('../config/Config');
const upload = configMulter();

const router = express.Router();

router.get('/', ExameneController.getExamenes);

router.get('/create', ExameneController.createExamene);

router.post('/store', upload.array('url', 10), ExameneValidator.store, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, ExameneController.storeExamene);

router.get('/show/:id', ExameneController.showExamene);

router.delete('/delete/:id', ExameneController.deleteExamene);

module.exports = router;