const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const db = require('./models');
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');
const ExameneRoutes = require('./routes/ExameneRoutes')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use('/storage', express.static(path.join(__dirname, 'storage')));

app.use(cors(corsOptions));
/* parse JSON to javascript object */
app.use(express.json());
app.use(cookieParser());

/* routes user */
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

/* routes examene */
app.use('/api/examenes', ExameneRoutes);

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
