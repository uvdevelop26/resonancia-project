const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Config = {
    createWebToken: (id, email, nombre, apellido, role) => {
        return jwt.sign(
            { id, email, nombre, apellido, role }, // Aquí incluimos todos los datos necesarios
            'secret webtoken user resonancia',
            {
                expiresIn: 3 * 24 * 60 * 60 // 3 días
            }
        );
    },

    configMulter: () => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const dir = path.join(__dirname, '../storage/analisis');
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, dir);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
            }
        });

        const upload = multer({ storage });

        return upload;
    }
}

module.exports = Config;