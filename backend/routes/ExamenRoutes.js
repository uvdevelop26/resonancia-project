const express = require('express');
const ExamenController = require('../controllers/ExamenController');
const ExamenValidator = require('../validators/ExamenValidator');
const { validationResult } = require('express-validator');
const { configMulter } = require('../config/Settings');
const upload = configMulter();

const router = express.Router();

router.get('/', ExamenController.getExamenes);

router.get('/create', ExamenController.createExamen);

router.post('/store', upload.array('url', 10), ExamenValidator.store, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, ExamenController.storeExamene);

router.get('/show/:id', ExamenController.showExamene);

router.delete('/delete/:id', ExamenController.deleteExamene);

module.exports = router;