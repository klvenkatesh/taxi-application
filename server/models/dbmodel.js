const db = require('../helpers/db').mainBucket;
const N1qlQuery = require('couchbase').N1qlQuery;


function dbModel() { };

dbModel.nQuery = function (queryString, positionParamArray) {
    let query = N1qlQuery.fromString(queryString);
    logger.info('N1Ql Query :: ' + queryString, positionParamArray);
    return new Promise((resolve,reject) =>{
        db.query(query, positionParamArray, function (err, data) {
            if (err) {
                reject(err);
            } else 
            resolve(data);
        });
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