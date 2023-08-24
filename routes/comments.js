var express = require("express");
var router = express.Router();
// const passport = require('passport');

const commentController = require('../controller/commentController');
const passport = require("passport");

router.post('/create', passport.checkAuthentication, commentController.create);

router.get('/destroy/:id', passport.checkAuthentication,commentController.destroy)
module.exports = router;