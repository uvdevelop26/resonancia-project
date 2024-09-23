const Auth = require('../../models/auth');
const authValidation = require('../validators/authValidation');

const authController = {
    login: async (req, res) => {

        const { email, password } = req.body;

        authValidation

        try {

            const user = await Auth.findUserByEmail(email);
            if (!user) {
                return res.status(400).json({ msg: 'Usuario no encontrado' });
            }

            const validPassword = await Auth.comparePassword(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ msg: 'Contraseña incorrecta' });
            }

            const token = Auth.generateToken(user);

            res.json({ token });
        } catch (err) {
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    }
};

module.exports = authController;
