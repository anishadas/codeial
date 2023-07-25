const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/partials&layouts');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to database'));
db.once('open', () => console.log("connected to database"));