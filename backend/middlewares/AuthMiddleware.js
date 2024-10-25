const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ msg: "No se proporcionó un token" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Token inválido" });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, 'secret webtoken user resonancia');
        req.user = decoded; // Guardar los datos del usuario en la solicitud
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Token no válido" });
    }
};

module.exports = authMiddleware;