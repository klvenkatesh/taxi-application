const express = require('express'),
    router = express.Router();
const app = express();

//URL's without tokens
router.get('/', function (req, res, next) {
    res.send({test:'indexExpress'});
    res.end();
});

router.use('/', require('./login-routes'));
module.exports = router;