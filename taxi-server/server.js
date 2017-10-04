const cors = require('cors'),
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mainRoute = require('./controllers/mainroute'),
    config = require('./helpers/config');

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', mainRoute);

http.createServer(app).listen(config.port, function (err) {
    console.log('server is listening on ',config.hostname,':',config.port);
});
