var cors = require('cors'),
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');
var mainRoute = require('./controllers/mainroute');

var access = '*'

router = express.Router();

var app = express();

app.use(require('morgan')({ "stream": logger.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', mainRoute);

http.createServer(app).listen(3001, function (err) {
    console.log('server is listening on http://localhost:3001');
});
