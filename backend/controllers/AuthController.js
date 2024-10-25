const { User, Persona, Role } = require('../models');
const bcrypt = require('bcryptjs');
const Config = require('../config/Config');

const AuthController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email: email },
                include: [
                    {
                        model: Persona,
                        as: 'personas',
                    },
                    {
                        model: Role,
                        as: 'role'
                    }
                ]
            });

            if (!user) {
                return res.status(400).json({ msg: "Usuario no encontrado" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);

            if (!isPasswordValid) {
                return res.status(400).json({ msg: "Contraseña incorrecta" });
            }

            // Crear el JWT
            const token = Config.createWebToken(user.id, user.email, user.personas[0].nombre, user.personas[0].apellido, user.role_id);

            // Enviar el token al cliente
            return res.status(200).json({ token, user });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },
    getUserInfo: async (req, res) => {
        try {
            // Obtener el usuario desde la base de datos utilizando el ID del token
            const user = await User.findOne({
                where: { id: req.user.id },
                include: [
                    {
                        model: Persona,
                        as: 'personas',
                    },
                    {
                        model: Role,
                        as: 'role'
                    }
                ]
            });

            if (!user) {
                return res.status(404).json({ msg: "Usuario no encontrado" });
            }

            // Retornar la información del usuario
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    }

};

module.exports = AuthController;
