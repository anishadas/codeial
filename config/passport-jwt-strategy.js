const passport = require('passport');
const User = require("../model/users");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
}
// secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature.

// authenticating the jwt
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload._id)
        .then(user => {
            if (user) return done(null, user);
            else return done(null, false);
        })
        .catch(err=> done(err))
}));

module.exports = passport;