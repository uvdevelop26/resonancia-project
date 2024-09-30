const db = require('../config/db');

const Persona = {

    /* get Persona by user Id */
    async getPersonaByUserId(userId) {

        const query = `SELECT * FROM personas WHERE user_id = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [userId], (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result[0]);

            });
        });

    },

    /* get Persona by dni */

    async getPersonaByDni(dni) {
        const query = `SELECT * FROM personas WHERE dni = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [dni], (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result[0]);

            });
        });
    },


    /* Create Persona */

    async createPersona({ nombre, apellidos, dni, telefono, fecha_nacimiento, sexo, direccion, edad, user_id, ciudade_id }) {

        const query = `INSERT INTO personas (nombre, apellidos, dni, telefono, fecha_nacimiento, sexo, direccion, edad, user_id, ciudade_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.query(query, [nombre, apellidos, dni, telefono, fecha_nacimiento, sexo, direccion, edad, user_id, ciudade_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },

    /* Update Persona */
    async updatePersona({ nombre, apellidos, dni, telefono, fecha_nacimiento, sexo, direccion, edad, user_id, ciudade_id }) {

        const query = `UPDATE personas SET nombre = ?, apellidos = ?, dni = ?, telefono = ?, fecha_nacimiento = ?, sexo = ?, direccion = ?, edad = ?, ciudade_id = ? WHERE user_id = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [nombre, apellidos, dni, telefono, fecha_nacimiento, sexo, direccion, edad, ciudade_id, user_id], (err, result) => {
                if (err) {
                    reject(err)
                }

                resolve(true);
            });
        });
    }


}

module.exports = Persona;