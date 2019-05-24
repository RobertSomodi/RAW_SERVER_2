var express = require("express");
var app = express();
var path  = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var db = require('./database');
var dbfunc = require('./db-function');
var http  = require('http')
var bodyParser = require('body-parser');
var UserRoute = require('../app/routes/user.route');
var StoreRoute = require('../app/routes/store.route');
var DepartmentRoute = require('../app/routes/department.route');
var TeamRoute = require('../app/routes/team.route');
var RoleRoute = require('../app/routes/role.route');
var PositionRoute = require('../app/routes/position.route');
var StoreDepartmentMapRoute = require('../app/routes/store-department-map.route');
var DepartmentTeamMapRoute = require('../app/routes/department-team-map.route');
var AuthenticRoute = require('../app/routes/authentic.route');
var errorCode = require('../common/error-code')
var errorMessage = require('../common/error-methods')
var checkToken = require('./secureRoute');

// var schedule = require('node-schedule');
 
// var j = schedule.scheduleJob('*/1 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

dbfunc.connectionCheck.then((data) =>{
    //console.log(data);
 }).catch((err) => {
     console.log(err);
 });
 
 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

var router = express.Router();
app.use('/api',router);
AuthenticRoute.init(router);

var secureApi = express.Router();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use('/secureApi',secureApi);
secureApi.use(checkToken);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// index route
app.get('/', (req,res) => {
    res.send('hello world');
});

var ApiConfig = {
  app: app
}

UserRoute.init(secureApi);
StoreRoute.init(secureApi);
DepartmentRoute.init(secureApi);
TeamRoute.init(secureApi);
RoleRoute.init(secureApi);
PositionRoute.init(secureApi);
StoreDepartmentMapRoute.init(secureApi);
DepartmentTeamMapRoute.init(secureApi);

module.exports = ApiConfig;
