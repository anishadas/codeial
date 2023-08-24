var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");
const passport = require('passport');

// localhost:8000/users/profile
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/signin', userController.signIn);
router.get('/signup', userController.signUp);

router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/signin' },
    // if authentiated, userController.createSession is called
), userController.createSession);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/signout',userController.destroySession)
module.exports = router;