'use strict';
const couchbase = require('couchbase');
const config = require('./config');

module.exports.mainBucket = (new couchbase.Cluster(config.couchbaseurl))
    .openBucket("default");
