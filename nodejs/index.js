const express = require("express");
const dbconn = require("./config/db.config");
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
var cors = require("cors"); 

const app = express();
const port = process.env.PORT || 3000;
const sessionStore = new MySQLStore({}, dbconn);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    path: "/",
    key: 'userId',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(cors({
    origin: [
        "http://localhost:3001"
    ],
    methods: ["GET", "POST"],
    credentials: true
}));

const userRoutes = require('./src/routes/user.route');
const reminderRoutes = require('./src/routes/reminder.route');

app.use('/reminders', reminderRoutes);
app.use('/accsetup', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})