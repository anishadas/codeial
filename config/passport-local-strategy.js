const passport = require('passport');
const User = require("../model/users");
const LocalStrategy = require('passport-local').Strategy;

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // done is a callback function which is reporting to passport.js
        // find a user & establish the identity
        User.findOne({ email: email })
            .then(user => {
                if (!user || user.password != password) {
                    console.log("Invalid Username/Password");
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(err => {
                console.log("error in finding user");
                return done(err);
            })
    }

));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
    // storing id as cookie
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            console.log("error in finding user");
            return done(err);
        })
});

module.exports = passport;