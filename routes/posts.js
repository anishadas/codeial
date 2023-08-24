var express = require("express");
var router = express.Router();
const passport = require('passport');

const postController = require('../controller/postController');

router.post('/create', passport.checkAuthentication, postController.create);

router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);

module.exports = router;