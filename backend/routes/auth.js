const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Asegúrate de configurar tu conexión a la base de datos.

// Ruta de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ msg: 'Error en el servidor' });
        if (results.length === 0) return res.status(400).json({ msg: 'Usuario no encontrado' });

        const user = results[0];

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        // Generar el token JWT
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
