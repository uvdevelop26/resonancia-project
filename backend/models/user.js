const db = require('../config/db')

const User = {

    /* Listar Usuarios */

    async getUser() {
        const query = `SELECT users.id, users.email, users.slug, roles.nombre AS rol, personas.nombre, personas.apellidos, personas.dni, ciudades.nombre AS ciudad, personas.direccion
        FROM users
        JOIN roles ON roles.id = users.role_id
        JOIN personas ON personas.user_id = users.id
        JOIN ciudades ON personas.ciudade_id = ciudades.id;`


        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {

                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    },

    /* Listar usuario por slug */

    async getUserBySlug(slug) {

        const query = `SELECT * FROM users WHERE slug = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [slug], (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result[0]);
            });
        });

    },

    /* Insertar Usuario */

    async createUser({ email, hashedPassword, role_id, slug }) {

        const query = `INSERT INTO users (email, password, role_id, slug) VALUES (?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.query(query, [email, hashedPassword, role_id, slug], (err, result) => {
                if (err) {
                    return reject(err);
                }
                const userId = result.insertId;
                resolve(userId);
            });
        });
    },

    /* Actualizar un usuario */

    async updateUser({ id, email, hashedPassword, role_id, slug }) {
        let query, values;

        if (hashedPassword) {
            query = `UPDATE users SET email = ?, password = ?, role_id = ?, slug = ? WHERE id = ?;`;
            values = [email, hashedPassword, role_id, slug, id];
        } else {
            query = `UPDATE users SET email = ?, role_id = ?, slug = ? WHERE id = ?;`;
            values = [email, role_id, slug, id];
        }

        return new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    },

    async deleteUser(id) {
        const query = `DELETE FROM users WHERE id = ?`;
    
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
    
                if (result.affectedRows === 0) {
                    return reject(new Error("El usuario no existe o ya ha sido eliminado"));
                }
    
                return resolve(true);
            });
        });
    }



}

module.exports = User;