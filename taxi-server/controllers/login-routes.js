const express = require('express');

const db = require('../helpers/db').mainBucket;
const config = require('../helpers/config');
const constants = require('../helpers/constants');
const decryptor = require('../helpers/cryptor');

const router = express.Router();
const app = express();

app.set('superSecret', config.secret);

router.get('/login', function (req, res) {

    let currentUser = constants.userKey + req.body.username;

    let encodedPassword = req.body.password;

    let decrypted = decryptor(encodedPassword, 'base64', 'utf8', 3);

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
            let userObj = userID.value;
            let userName = userID.value.userName;
            let password = userID.value.pass_word;
            let roleID = userID.value.role_Id;
            let isNewUser = userID.value.isNewUser;
            let isUserLocked = userID.value.isUserLocked;
            let preferredLang = userID.value.preferredLang;
            //let isLoggedIn = userID.value.isLoggedIn;
            console.log('Got USer Data :: ' + JSON.stringify(userID.value));
            db.get(roleID, function (error, role) {
                if (error) {
                    logger.info("Roles" + error);
                    throw error;
                }
                if (userName === req.body.username) {
                    if (password === decrypted && userObj.isUserLocked < 5) {
                        let claims = {
                            sub: req.body.username
                        };
                        let token = en
                        let response = {
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
                                let loginLog = JSON.stringify(response);
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
});

module.exports = router;
