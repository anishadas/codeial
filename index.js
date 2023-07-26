const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const PORT = 8000;

const app = express();
const db = require('./config/mongoose');

app.use(expressLayouts);
// for post requests
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/', require('./routes'));
app.use(express.static('./assets'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port ${PORT}`);
})

// for cookies
// npm i cookie-parser