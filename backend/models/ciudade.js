const db = require("../config/db");


const Ciudade = {

    async getCiudades(req, res) {

        const query = `SELECT * FROM ciudades`;

        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });

    }


}

module.exports = Ciudade;