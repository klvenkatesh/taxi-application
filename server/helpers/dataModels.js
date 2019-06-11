const constants = require('./constants');
let customerDoc = {
    username: 'customer1',
    userID: constants.userKey + 'customer1',
    userType: 'Driver',
    password: 'pass'
};

let userDoc = {
    username: 'driver1',
    userID: constants.userKey + 'driver1',
    userType: 'Driver',
    password:'pass'
};

let rideDoc = {
    rideId:constants.rideKey+'1',
    customerId:constants.userKey+'customer1',
    driverID:constants.userKey+'driver1',
    rideStartTime:'2017-08-16T09:50:21.992Z',
    rideEndTime:'2017-08-16T09:55:21.992Z'
};
