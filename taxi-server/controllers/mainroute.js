const express = require('express'),
    router = express.Router();
const app = express();

//URL's without tokens
router.use('/',(request,response)=>{
    response.send('response ');
    response.end();
});
router.use('/', require('./login-routes'));
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.AccessToken;
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
