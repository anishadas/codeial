var express = require("express");
var router = express.Router();
const homeController = require("../controller/homeController");


router.get('/', homeController.home);

// localhost:8000/users
router.use('/users', require('./users'));

module.exports = router;