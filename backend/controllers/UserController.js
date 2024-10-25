const { User, Persona, Role, Departamento, Ciudade } = require('../models');
const bcrypt = require('bcryptjs');

const UserController = {

    getUsers: async (req, res) => {
        try {
            const { type } = req.params;

            const role = await Role.findOne({ where: { role_nombre: type } });

            if (!role) {
                return res.status(400).json({ msg: "Rol no encontrado" });
            }

            const users = await User.findAll({
                where: { role_id: role.id },
                include: [
                    {
                        model: Persona,
                        as: 'personas',
                        include: [
                            {
                                model: Ciudade,
                                as: 'ciudade'
                            }
                        ]
                    },
                ]
            });

            if (!users) {
                return res.status(404).json({ msg: "Usuarios no encontrados" });
            }

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({ msg: "Error al buscar usuarios" });
        }
    },

    createUser: async (req, res) => {
        try {

            const { type } = req.params;

            const role = await Role.findOne({ where: { role_nombre: type } });

            if (!role) {
                return res.status(400).json({ msg: "Rol no encontrado" });
            }

            const departamentos = await Departamento.findAll({
                include: {
                    model: Ciudade,
                    as: 'ciudades'
                },
            });

            if (!role || !departamentos) {
                return res.status(400).json({ msg: "Error en el servidor" });
            }

            return res.status(200).json({ role, departamentos });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    storeUser: async (req, res) => {

        try {

            const { nombre, apellido, slug, dni, telefono, fecha_nacimiento, sexo, direccion, edad, ciudade_id, email, password, profile_photo_path, role_id } = req.body;

            /* encrypt password */
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            /* create user */
            const user = await User.create({
                email,
                password: hashedPassword,
                profile_photo_path,
                role_id
            });

            /* create Persona */

            await Persona.create({
                nombre,
                apellido,
                slug,
                dni,
                telefono,
                fecha_nacimiento,
                sexo,
                direccion,
                edad,
                user_id: user.id,
                ciudade_id
            });

            res.status(200).json({ msg: "Usuario creado exitosamente" });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }

    },


    editUser: async (req, res) => {
        try {

            /* find user and persona */
            const { slug } = req.params;

            const persona = await Persona.findOne({ where: { slug: slug } });

            const user = await User.findOne({
                where: { id: persona.user_id },
                include: {
                    model: Role,
                    as: 'role'
                }
            });

            /* finding data */
            const departamentos = await Departamento.findAll({
                include: {
                    model: Ciudade,
                    as: 'ciudades'
                },
            });

            if (!departamentos || !persona || !user) {
                return res.status(400).json({ msg: "Error en el servidor" });
            }

            return res.status(200).json({ user, persona, departamentos });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { slug: slugParam } = req.params;

            const { nombre, apellido, slug, dni, telefono, fecha_nacimiento, sexo, direccion, edad, ciudade_id, email, password, profile_photo_path, role_id } = req.body;

            let hashedPassword = null;

            if (password) {
                const salt = bcrypt.genSaltSync(10);
                hashedPassword = bcrypt.hashSync(password, salt);
            }

            /* finding models */
            const persona = await Persona.findOne({ where: { slug: slugParam } });

            const userId = persona.user_id;

            const user = await User.findOne({ where: { id: userId } });

            if (!user || !persona) {
                return res.status(404).json({ msg: "Usuario no encontrado" });
            }

            /* updating */
            await user.update({
                email,
                password: password ? hashedPassword : user.password,
                profile_photo_path,
                role_id
            });

            await persona.update({
                nombre,
                apellido,
                slug,
                dni,
                telefono,
                fecha_nacimiento,
                sexo,
                direccion,
                edad,
                ciudade_id,
            });

            res.status(200).json({ msg: "Usuario actualizado exitosamente" });

        } catch (error) {

            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    deleteUser: async (req, res) => {

        try {
            const { slug } = req.params;

            /* find models */

            const persona = await Persona.findOne({ where: { slug: slug } });
            const userId = persona.user_id;
            const user = await User.findOne({ where: { id: userId } });

            /* deleting */
            await persona.destroy();
            await user.destroy();


            res.status(200).json({ msg: "Usuario eliminado exitosamente" });

        } catch (error) {

            return res.status(500).json({ msg: "Error en el servidor" });
        }

    }

}

module.exports = UserController;

