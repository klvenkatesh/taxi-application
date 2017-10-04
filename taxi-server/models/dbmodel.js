var db = require('../helpers/database').mainBucket;
var N1qlQuery = require('couchbase').N1qlQuery;


function dbModel() { };

dbModel.nQuery = function (queryString, positionParam, callback) {
    var query = N1qlQuery.fromString(queryString);
    logger.info('N1Ql Query :: ' + queryString, positionParam);
    db.query(query, [positionParam], function (err, data) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
};

dbModel.dbGet = (docName) => {
    return new Promise(
        function (resolve, reject) {
            db.get(docName,
                (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(data);
                    }
                }
            )
        }
    );
};


dbModel.dbGetMulti = (docName) => {
    return new Promise(
        function (resolve, reject) {
            db.getMulti(docName,
                (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(data);
                    }
                }
            )
        }
    );
};

dbModel.upsertDb = (docName, dataToBeUpdated) => {
    return new Promise(
        function (resolve, reject) {
            db.upsert(docName, dataToBeUpdated,
                (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(data);
                    }
                }
            )
        }
    );
};


module.exports = dbModel;