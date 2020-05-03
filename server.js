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

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    userController.getUserByUsername(username).then(result => {
        if (result != null) {
            res.redirect('/');
        }
        else {
            res.send("No user found.");
        }
    });
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


