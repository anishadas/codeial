const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const PORT = 8000;
const saasMiddleware = require('node-sass-middleware');

const app = express();
const db = require('./config/mongoose');

// for saas
// debug: false in production as we dont wnat to thrw errors
// prefix: it will look for '/css/layout.css' with /css as prefix
app.use(saasMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}))
// for post requests
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
// extract styles & scripts from layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

// saveUninitialized: if the session is not initialied/identified or user has not signed in,I dont want to store/save anything in cookie
// resave: if some data i store in session cookie, do I want to rewrite the same data again and save it
app.use(session({
    name: 'Codeial',
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        // millisec
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/partials&layouts',
        autoRemove: 'disabled'
    })
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port ${PORT}`);
})

// for cookies
// npm i cookie-parser