var express = require("express");
var router = express.Router();
const homeController = require("../controller/homeController");


router.get('/', homeController.home);

// localhost:8000/users
router.use('/users', require('./users'));

// localhost:8000/posts
router.use('/posts', require('./posts'));

// localhost:8000/comments
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

module.exports = router;