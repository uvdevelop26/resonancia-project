const { User, Persona } = require('../models');
const bcrypt = require('bcryptjs');

const AuthController = {
    login: async (req, res) => {

        try {
            
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(400).json({ msg: "Usuario no encontrado" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);

            if (!isPasswordValid) {
                return res.status(400).json({ msg: "Contraseña incorrecta" });
            }


            return res.status(200).json({ user });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" })
        }
    },

    getUserAuth: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    }
};

module.exports = AuthController;
