var cors = require("cors");
const express = require("express");
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const dbconn = require("./config/db.config");

const app = express();
const port = process.env.PORT || 3000;
const sessionStore = new MySQLStore({}, dbconn);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get('/', (req, res) => {
    if(req.session.viewCount) {
        req.session.viewCount++;
    } else {
        req.session.viewCount = 1;
    }
    console.log(req.session);
    res.send(`${req.session.viewCount} times`);
});

const userRoutes = require('./src/routes/user.route');
app.use('/users', userRoutes);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})