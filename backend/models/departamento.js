const db = require('../config/db');

const Departamento = {

    async getDepartamentos(req, res) {

        const query = `SELECT * FROM departamentos`;

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

module.exports = Departamento;