var express = require('express');
var router = express.Router();
var db = require('../helpers/database').mainBucket;
var counter = { current: 0, total: 0 };
var config = require('../config');
var jwt = require('jsonwebtoken');
var app = express();
var logger = require('../helpers/logger');
var appd = require("appdynamics");
var decryption = require('../models/encodeDecode');
var cbExit = require('../config').cbExit;

app.set('superSecret', config.secret);

router.post('/login', function (req, res) {

    //var LgExit = appd.getTransaction(req);

    var currentUser = 'myproductInduct::user::ID::' + req.body.username;

    //--------- This is the decrypting part ;)
    var encodedPassword = req.body.password;

    var decrypted = decryption(encodedPassword, 'base64', 'utf8', 3);

    //----- Hitting the lookup

    //var etCall = LgExit.startExitCall(cbExit);
    db.get(currentUser, function (error, userID) {
        if (error) {
            if (error.code == 13) {
                logger.info("Not Found");
                res.status(403);
                res.json({ result: "not found/failed", isUserLocked: false });
            }
            else {
                logger.info("individual User documents" + error);
                throw error;
            }
        }
        else {
            var userObj = userID.value;
            var userName = userID.value.userName;
            var password = userID.value.pass_word;
            var roleID = userID.value.role_Id;
            var isNewUser = userID.value.isNewUser;
            var isUserLocked = userID.value.isUserLocked;
            var preferredLang = userID.value.preferredLang;
            //var isLoggedIn = userID.value.isLoggedIn;
            console.log('Got USer Data :: ' + JSON.stringify(userID.value));
            db.get(roleID, function (error, role) {
                if (error) {
                    logger.info("Roles" + error);
                    throw error;
                }
                if (userName === req.body.username) {
                    if (password === decrypted && userObj.isUserLocked < 5) {
                        var claims = {
                            sub: req.body.username
                        };
                        var token = jwt.sign(claims, app.get('superSecret'), {});
                        var response = {
                            call: "response",
                            result: "success",
                            token: token,
                            role: role.value.role_name,
                            isNewUser: isNewUser,
                            isUserLocked: isUserLocked,
                            preferredLang: preferredLang,
                            //isLoggedIn: isLoggedIn
                        };
                        userObj.passwordFailCount = 0;


                        db.upsert(currentUser, userObj, function (err) {
                            if (err) {
                                errHandler(err);
                            } else {
                                res.json(response);
                                var loginLog = JSON.stringify(response);
                                logger.info(loginLog);
                            }
                        })
                    }
                    else {
                        logger.info("Failed");
                        userObj.passwordFailCount = userObj.passwordFailCount + 1;
                        if (userObj.passwordFailCount >= 5) {
                            userObj.isUserLocked = true;
                        }
                        db.upsert(currentUser, userObj, function (err) {
                            if (err) {
                                errHandler(err);
                            } else {
                                res.status(403);
                                res.json({
                                    result: "not found/failed",
                                    isUserLocked: userObj.isUserLocked
                                });
                            }
                        });
                    }
                }
            });
        }
    });
    // LgExit.endExitCall(etCall);
});

module.exports = router;
