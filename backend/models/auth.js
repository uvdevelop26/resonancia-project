const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Auth = {
    /* Encontrar usuario por email  */
    async findUserByEmail(email) {

        const query = 'SELECT * FROM users WHERE email = ?';

        return new Promise((resolve, reject) => {
            db.query(query, [email], (err, result) => {
                if (err) return reject(err);
                /* devuelve el usuario encontrado */
                resolve(result[0]);
            });
        });
    },

    /* Comparar contraseñas */
    async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    },

    /* generar token de acceso */

    generateToken(user) {
        return jwt.sign({ id: user.id, role: user.role_id }, 'secretkey', { expiresIn: '1h' });
    }
}

module.exports = Auth;
