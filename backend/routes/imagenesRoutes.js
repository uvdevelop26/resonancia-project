const express = require('express');
const { imagenController, upload } = require('../http/controllers/imagenController');

const router = express.Router();


router.get('/images', imagenController.imageIndex)
router.post('/store', upload.single('file'), imagenController.imagenStore);

module.exports = router;
