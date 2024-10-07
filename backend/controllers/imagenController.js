const path = require('path');
const fs = require('fs');
const Imagen = require('../../models/imagen'); // Asegúrate de importar tu modelo de Imagen
const multer = require('multer');

// Configurar multer para guardar archivos en 'storage/analisis'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../storage/analisis');
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

const imagenController = {

  imageIndex: async (req, res) => {

    try {
      const images = await Imagen.getImages(req, res);
      if (!images) {
        return res.status(400).json({ msg: "No existen Imágenes" });
      }

      return res.status(200).json(images);

    } catch (error) {
      res.status(500).json({ msg: 'Error en el servidor' });

    }

  },


  imagenStore: (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
    }

    const imageUrl = `/storage/analisis/${file.filename}`;

    // Guardar la URL de la imagen en la base de datos
    Imagen.createImagen(imageUrl)
      .then(() => {
        return res.status(200).json({ message: 'Imagen almacenada correctamente', url: imageUrl });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ error: 'Error al guardar la imagen en la base de datos' });
      });
  },
};

module.exports = { imagenController, upload };
