const passport = require('passport');
const User = require("../model/users");
const LocalStrategy = require('passport-local').Strategy;

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true,
},
    function (req,email, password, done) {
        // done is a callback function which is reporting to passport.js
        // find a user & establish the identity
        User.findOne({ email: email })
            .then(user => {
                if (!user || user.password != password) {
                    req.flash('error',"Invalid Username/Password")
                    // console.log("Invalid Username/Password");
                    return done(null, false);
                }
                // return the duser to serializer
                return done(null, user);
            })
            .catch(err => {
                req.flash('error',"No User Found")
                // console.log("error in finding user");
                return done(err);
            })
    }

));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
    // storing id as cookie and encrypt it using express session
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

// midlleware to check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
    // if the user is signed in, then pass the req to next function
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log("user",req.user,res.locals)
        // req.user contains the current signedin user from the session cookie and we are just sending this to the the locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;