const cors = require('cors'),
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mainRoute = require('./controllers/main-route'),
    config = require('./helpers/config');

const router = express.Router();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api', mainRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

http.createServer(app).listen(config.port, function (err) {
    console.log('server is listening on ',config.hostname,':',config.port);
});

module.exports = app;
