// routes/Users.js
const express = require('express');
const db = require('../config/db.js');  // Importa la conexión a la base de datos

const router = express.Router();

/* user index */
router.get('/users', (req, res) => {
    const query = `
        SELECT personas.nombre, 
        personas.apellidos as apellidos,
        personas.dni, 
        personas.telefono, 
        personas.fecha_nacimiento, 
        personas.sexo,
        personas.direccion, 
        personas.edad, 
        departamentos.nombre AS nombre_departamento, 
        ciudades.nombre AS nombre_ciudad,
        users.email,
        users.id, 
        roles.nombre as rol
        FROM 
            users 
        INNER JOIN 
            personas ON users.id = personas.user_id
        INNER JOIN 
            ciudades ON personas.ciudade_id = ciudades.id
        INNER JOIN 
            departamentos ON ciudades.departamento_id = departamentos.id
        INNER JOIN 
            roles ON users.role_id = roles.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ message: 'Error en la consulta a la base de datos' });
        }

        res.json(results);
    });
});

/* user create */
router.post('/users/create', (req, res) => {
    const { nombre, apellidos, dni, telefono, fecha_nacimiento, edad, sexo, ciudade_id, departamento_id, direccion, email, password } = req.body;

    // Inicia una transacción
    db.beginTransaction((err) => {
        if (err) {
            console.error('Error iniciando la transacción:', err);
            return res.status(500).json({ message: 'Error iniciando la transacción' });
        }

        // Inserta primero en la tabla users
        const createUserQuery = `
            INSERT INTO users (email, password, role_id) VALUES (?, ?, ?);
        `;

        db.query(createUserQuery, [email, password, 1], (err, result) => {
            if (err) {
                db.rollback(() => {
                    console.error('Error al insertar en users:', err);
                    return res.status(500).json({ message: 'Error al crear el usuario' });
                });
            } else {
                // Obtén el ID del usuario insertado
                const userId = result.insertId;

                // Inserta en la tabla personas, utilizando el ID del usuario insertado
                const createPersonQuery = `
                    INSERT INTO personas (nombre, apellidos, dni, telefono, fecha_nacimiento, edad, sexo, direccion, user_id, ciudade_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;

                db.query(createPersonQuery, [nombre, apellidos, dni, telefono, fecha_nacimiento, edad, sexo, direccion, userId, ciudade_id], (err, result) => {
                    if (err) {
                        db.rollback(() => {
                            console.error('Error al insertar en personas:', err);
                            return res.status(500).json({ message: 'Error al crear la persona' });
                        });
                    } else {
                        // Confirma la transacción
                        db.commit((err) => {
                            if (err) {
                                db.rollback(() => {
                                    console.error('Error al confirmar la transacción:', err);
                                    return res.status(500).json({ message: 'Error al confirmar la transacción' });
                                });
                            }
                            // Éxito: usuario y persona creados
                            res.status(201).json({ message: 'Usuario y persona creados exitosamente' });
                        });
                    }
                });
            }
        });
    });
});

/* ruta para editar usuario */
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    const query = `SELECT 
        personas.id as persona_id, 
        personas.nombre, 
        personas.apellidos, 
        personas.dni, 
        personas.telefono, 
        personas.fecha_nacimiento, 
        personas.edad, 
        personas.sexo, 
        personas.direccion, 
        personas.ciudade_id,
        users.email, 
        users.password, 
        users.role_id
        FROM 
            personas
        JOIN 
            users ON personas.user_id = users.id
        WHERE 
            users.id = ?`
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(result[0]);
    });
});

/* ruta para actualizar */
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { nombre, apellidos, dni, telefono, fecha_nacimiento, edad, sexo, direccion, ciudade_id, email, password, role_id } = req.body;

    // Consulta para actualizar la tabla "personas"
    const queryPersonas = `
        UPDATE personas 
        SET nombre = ?, apellidos = ?, dni = ?, telefono = ?, fecha_nacimiento = ?, edad = ?, sexo = ?, direccion = ?, ciudade_id = ?
        WHERE user_id = ?
    `;

    // Consulta para actualizar la tabla "users"
    const queryUsers = `
        UPDATE users 
        SET email = ?, password = ?, role_id = ?
        WHERE id = ?
    `;

    // Ejecutar ambas consultas
    db.query(queryPersonas, [nombre, apellidos, dni, telefono, fecha_nacimiento, edad, sexo, direccion, ciudade_id, userId], (err, result) => {
        if (err) {
            console.error('Error al actualizar los datos de la persona:', err);
            return res.status(500).json({ message: 'Error al actualizar los datos de la persona' });
        }

        // Actualizar la tabla "users" después de actualizar "personas"
        db.query(queryUsers, [email, password, role_id, userId], (err, result) => {
            if (err) {
                console.error('Error al actualizar el usuario:', err);
                return res.status(500).json({ message: 'Error al actualizar el usuario' });
            }

            res.status(200).json({ message: 'Usuario y datos de persona actualizados correctamente' });
        });
    });
});

//delete user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    // Primero elimina el registro de la tabla personas
    const deletePersonQuery = 'DELETE FROM personas WHERE user_id = ?';
    db.query(deletePersonQuery, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la persona:', err);
            return res.status(500).json({ message: 'Error al eliminar la persona' });
        }

        // Después elimina el registro de la tabla users
        const deleteUserQuery = 'DELETE FROM users WHERE id = ?';
        db.query(deleteUserQuery, [id], (err, result) => {
            if (err) {
                console.error('Error al eliminar el usuario:', err);
                return res.status(500).json({ message: 'Error al eliminar el usuario' });
            }
            res.status(200).json({ message: 'Usuario y persona eliminados exitosamente' });
        });
    });
});



module.exports = router;
