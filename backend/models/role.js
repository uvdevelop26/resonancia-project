const db = require('../config/db');


const Role = {

    async getRoles(req, res) {

        const query = `SELECT * FROM roles`;

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


module.exports = Role;