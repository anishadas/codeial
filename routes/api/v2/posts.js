var express = require("express");
var router = express.Router();
const posts_api = require('../../../controller/api/v2/posts_api');

router.get('/', posts_api.index);
module.exports = router;