var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");

// localhost:8000/users/profile
router.get('/profile', userController.profile);

module.exports = router;