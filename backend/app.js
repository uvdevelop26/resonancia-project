const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const usersRouter = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const imagenesRoutes = require('./routes/imagenesRoutes');

const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza con el puerto donde corre tu frontend Vue.js
    optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.use('/storage', express.static(path.join(__dirname, 'storage')));
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', usersRouter);
app.use('/api/imagenes', imagenesRoutes);

//Puerto y Servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
