const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./routes/users'); // Usa require en lugar de import

const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza con el puerto donde corre tu frontend Vue.js
    optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions)); 
app.use(express.json());



// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api', usersRouter); // Cambié la ruta para que esté clara la referencia a users

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
