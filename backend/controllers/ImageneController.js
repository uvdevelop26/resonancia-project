const path = require('path');
const fs = require('fs');
const { Imagene } = require('../models');
const multer = require('multer');

// Configurar multer para guardar archivos en 'storage/analisis'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../storage/analisis'); // Cambia '../../' por '../'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const ImageneController = {

  getImagenes: async (req, res) => {

    try {

      const imagenes = await Imagene.findAll();

      if (!imagenes) {
        return res.status(400).json({ msg: "No existen Imágenes" });
      }

      return res.status(200).json(imagenes);

    } catch (error) {
      return res.status(500).json({ msg: "No hay Imágenes para mostrar" });
    }

  },


  storeImagene: async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
      }

      const imageUrl = `/storage/analisis/${file.filename}`;

      const nuevaImagen = await Imagene.create({
        url: imageUrl,
      });

      // Responder con éxito
      return res.status(201).json({
        msg: 'Imagen capturada correctamente',
        imageUrl: nuevaImagen.url,
      });

    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      return res.status(500).json({ error: 'Error al guardar la imagen en la base de datos' });
    }

  },
};

module.exports = { ImageneController, upload };
