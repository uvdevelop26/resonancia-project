const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};


//app.use('/storage', express.static(path.join(__dirname, 'storage')));

app.use(cors(corsOptions));
app.use(express.json());

/* routes */
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
