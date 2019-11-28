var http = require('http');
const _ = require('lodash');
const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const originsWhitelist = [
  'http://localhost:4200'
];

const corsOptions = {
  origin: function(origin, callback){
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(expressJwt({secret: 'tictactoe-app-super-shared-secret'}).unless({path: ['/api/auth']}));

app.get('/', function (req, res) {
    res.send('Angular API Server')
});
app.post('/api/auth', function(req, res) {
  const body = req.body;

  var token = jwt.sign({userID: body.username}, 'tictactoe-app-super-shared-secret', {expiresIn: '2h'});
  res.send({token});
});

app.listen(4000, function () {
  console.log('Angular API Server listening on port 4000!')
});