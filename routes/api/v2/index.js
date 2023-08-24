var express = require("express");
var router = express.Router();
const posts_api = require('../../../controller/api/v2/posts_api');

router.use('/posts', require('./posts'));

module.exports = router;