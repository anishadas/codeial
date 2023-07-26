var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");

// localhost:8000/users/profile
router.get('/profile', userController.profile);
router.get('/signin', userController.signIn);
router.get('/signup', userController.signUp);

router.post('/create', userController.create);

module.exports = router;