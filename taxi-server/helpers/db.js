'use strict';

var couchbase = require('couchbase');
var config = require('../config');

module.exports.mainBucket = (new couchbase.Cluster(config.couchbase.url))
    .openBucket("default");
