const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const db = require('../../config/db');

const userValidation = {
    checkValidity: [
        /* nombre */
        check('nombre', 'El campo nombre es obligatorio').notEmpty(),
        check('nombre', 'El campo nombre no puede tener más de 200 caracteres').isLength({ max: 200 }),
        /* apellidos */
        check('apellidos', 'El campo apellido es obligatorio').notEmpty(),
        check('apellidos', 'El campo apellido no debe tener más de 200 caracteres').isLength({ max: 200 }),
        /* dni */
        check('dni', 'El campo dni es obligatorio').notEmpty(),
        check('dni', 'El campo dni no debe tener más de 20 caracteres').isLength({ max: 20 }),
        check('dni').custom(async (value) => {
            const existingDni = await db.Persona.findOne({ where: { dni: value } });
            if (existingDni) {
                throw new Error('El dni ya está registrado');
            }
            return true;
        }),
        /* telefono */
        check('telefono', 'El campo teléfono no debe tener más de 20 caracteres').isLength({ max: 20 }),

        /* fecha de nacimiento */
        check('fecha_nacimiento', 'El campo fecha de nacimiento es obligatorio').notEmpty(),
        check('fecha_nacimiento', 'Inserta una fecha válida').isDate(),

        /* sexo */
        check('sexo', 'El campo sexo es obligatorio').notEmpty(),
        check('sexo', 'El campo sexo no debe tener más de 10 caracteres').isLength({ max: 10 }),

        /* dirección */
        check('direccion', 'El campo dirección es obligatorio').notEmpty(),
        check('direccion', 'El campo dirección no debe tener más de 255 caracteres').isLength({ max: 255 }),

        /* edad */
        check('edad', 'El campo dirección es obligatorio').notEmpty(),
        check('edad', 'La edad dee ser un número').isNumeric(),
        check('edad', 'La edad debe ser un número entre 1 y 100').isInt({ min: 1, max: 100 }),

        /* ciudad */
        check('ciudade_id', 'El campo ciudad es obligatorio').notEmpty(),

        /* slug */
        check('slug', 'El campo slug es obligatorio').notEmpty(),

        /* email */
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'Introduce un email válido').isEmail(),

        /* password */
        check('password', 'La contraseña es obligatoria').notEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),

        /* rol */
        check('role_id', 'El campo rol es obligatorio').notEmpty(),
    ],


    handleValidationErrors: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
};

module.exports = userValidation;