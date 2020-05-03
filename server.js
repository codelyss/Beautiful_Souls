const express = require('express');
const path = require('path');
const sequelize = require('./config/connection.js');
const session = require('express-session');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const userController = require('./controllers/userController.js');
const letterController = require('./controllers/letterController.js');
const responseController = require('./controllers/responseController.js');

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const PORT = process.env.PORT || 1332;
const app = express();

app.use(express.static('views'));
app.use(session({
    secret: 'beautiful souls secret message here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //this should be turned to true before deploying to heroku
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userController.getUserById(id).then(result => {
        done(null, result.id);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        userController.getUserByUsername(username).then(result => {
            if (result == null) { return done("User not found"); }
            if (result.validPassword(password)) {
                return done(null, result);
            }
        });
    }
));

app.get('/', ensureLoggedIn('/login'), (req, res) => {
    res.sendFile(path.join(__dirname, './views/main.html'));
});

app.get('/newuser', (req, res) => {
    res.sendFile(path.join(__dirname, './views/newuser.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});

app.get('/create', ensureLoggedIn('/login'), (req, res) => {
    res.sendFile(path.join(__dirname, './views/create.html'));
});

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, './views/view.html'));
});

app.get('/inbox', (req, res) => {
    res.sendFile(path.join(__dirname, './views/inbox.html'));
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
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

app.post('/api/createLetter', ensureLoggedIn('/login'), (req, res) => {
    let letter = req.body;
    let userid = req.user;
    letterController.createLetter(userid, letter).then(result => {
        res.send(result);
    })
});

app.listen(PORT, () => {
    sequelize.sync().then(result => {
        console.log(`API server now on port ${PORT}!`);
    });
});