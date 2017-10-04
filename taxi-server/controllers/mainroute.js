var express = require('express'),
    router = express.Router();
var config = require('../config');
var app = express();

//URL's without tokens
router.use('/', require('./login-routes'));
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.AccessToken;
    //console.log('the cookie for this request is' + req.cookies.AccessToken);
    // decode token
    if (token) {

        // verifies secret and checks exp
        verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other controllers
                req.decoded = decoded;
                console.log('decoded', req.decoded);
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});
module.exports = router;
