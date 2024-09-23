//blog index, blog show, blog create, blog store, blog edit, blog update, blog delete
const User = require('../../models/user');
const Persona = require('../../models/persona')
const Role = require('../../models/role');
const Departamento = require('../../models/departamento');
const Ciudade = require('../../models/ciudade');
const bcrypt = require('bcryptjs');
const db = require('../../config/db');


const userController = {

    /* Index */
    userIndex: async (req, res) => {

        try {
            const users = await User.getUser(req, res);
            if (!users) {
                return res.status(400).json({ msg: "No existen Usuarios" });
            }

            return res.status(200).json(users);

        } catch (error) {
            res.status(500).json({ msg: 'Error en el servidor' });

        }

    },

    /* Create */
    userCreate: async (req, res) => {
        try {

            const roles = await Role.getRoles(req, res);
            const departamentos = await Departamento.getDepartamentos(req, res);
            const ciudades = await Ciudade.getCiudades(req, res);

            if (!roles) {
                return req.status(400).json({ msg: "No existen Roles" });
            }

            if (!departamentos) {
                return req.status(400).json({ msg: "No existen Departamentos" });
            }

            if (!ciudades) {
                return req.status(400).json({ msg: "No existen Ciudades" });
            }

            return res.status(200).json({ roles, departamentos, ciudades });

        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    /* Store */

    userStore: async (req, res) => {

        const { nombre, apellidos, slug, dni, telefono, fecha_nacimiento, edad, sexo, ciudade_id, departamento_id, direccion, email, role_id, password } = req.body;

        try {

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            /* transacción asegura que las inserciones se realzen con éxito */
            //  await db.beginTransaction();

            const userId = await User.createUser({ email, hashedPassword, role_id, slug });

            await Persona.createPersona({
                nombre,
                apellidos,
                dni,
                telefono,
                fecha_nacimiento,
                edad,
                sexo,
                direccion,
                user_id: userId,
                ciudade_id
            });

            /* confirma que la transacción se ha realizado */
            //  await db.commit();

            res.status(201).json({ msg: "Usuario creado exitosamente", userId });


        } catch (error) {
            /* si hay error revierte la transacción, es decir ninguna se inserta */
            //  await db.rollback();
            res.status(500).json({ error: error.message });
        }

    },

    /* Edit */

    userEdit: async (req, res) => {

        const { slug } = req.params;

        try {

            /* Obtener Usuario y Persona */
            const user = await User.getUserBySlug(slug);
            const userId = user.id;
            const persona = await Persona.getPersonaByUserId(userId);

            /* otros datos */
            const roles = await Role.getRoles();
            const ciudades = await Ciudade.getCiudades();
            const departamentos = await Departamento.getDepartamentos();


            /* enviar respuesta */
            return res.status(200).json({ user, persona, roles, ciudades, departamentos });

        } catch (error) {

            return res.status(500).json({ error: error });
        }

    },

    /* Update */

    userUpdate: async (req, res) => {

        const { id, nombre, apellidos, slug, dni, telefono, fecha_nacimiento, edad, sexo, ciudade_id, departamento_id, direccion, email, role_id, password } = req.body;

        try {

            let hashedPassword = null;


            if (password) {
                const salt = bcrypt.genSaltSync(10);
                hashedPassword = bcrypt.hashSync(password, salt);
            }

            await User.updateUser({
                id,
                email,
                hashedPassword: password ? hashedPassword : undefined,
                role_id,
                slug
            });

            await Persona.updatePersona({
                nombre,
                apellidos,
                dni,
                telefono,
                fecha_nacimiento,
                sexo,
                direccion,
                edad,
                user_id: id,
                ciudade_id,
            });

            return res.status(200).json({ msg: "Usuario actualizado exitosamente" });


        } catch (error) {
            return res.status(500).json({ msg: "Error en el Servidor" });
        }

    },

    /* delete */

    userDelete: async (req, res) => {
        const { id } = req.params;
    
        try {
            await User.deleteUser(id);
    
            return res.status(200).json({ msg: "Usuario eliminado exitosamente" });
            
        } catch (error) {
            return res.status(500).json({ msg: error.message || "Error en el Servidor" });
        }
    }


}

module.exports = userController;