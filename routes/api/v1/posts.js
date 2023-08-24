let express = require("express");
let router = express.Router();
let passport = require('passport');
const posts_api = require('../../../controller/api/v1/posts_api');

router.get('/', posts_api.index);
router.delete('/:id', passport.authenticate('jwt', { session: false }), posts_api.destroy);

module.exports = router;