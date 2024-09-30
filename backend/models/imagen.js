const db = require('../config/db');

const Imagen = {

    async getImages() {

        const query = `SELECT * FROM imagenes`;

        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    return reject(err)
                }

                return resolve(result);
            });
        });

    },

    async createImagen(url) {

        const query = `INSERT INTO imagenes (url) VALUES (?)`

        return new Promise((resolve, reject) => {
            db.query(query, [url], (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(true);
            });
        });

    }

}

module.exports = Imagen;