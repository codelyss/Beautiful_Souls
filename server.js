const express = require('express');
const path = require('path');
const sequelize = require('./config/connection.js');

const userController = require('./controllers/userController.js');
const letterController = require('./controllers/letterController.js');
const responseController = require('./controllers/responseController.js');

const PORT = process.env.PORT || 1332;
const app = express();

app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/main.html'));
});

app.get('/newuser', (req, res) => {
    res.sendFile(path.join(__dirname, './views/newuser.html'));
});

app.post('/newuser', (req, res) => {
    var data = {
        username: req.body.username,
        password: req.body.password
    };

    userController.createUser(data).then(result => {
        res.send(result);
    });
});

app.listen(PORT, () => {
    sequelize.sync().then(result => {
        console.log(`API server now on port ${PORT}!`);
    });
});


