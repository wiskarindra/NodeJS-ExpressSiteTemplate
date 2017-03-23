
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , message = require('./routes/message')
  , http = require('http')
  , path = require('path');

var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection  = require('express-myconnection');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({
    extended: true
  })); // for parsing application/x-www-form-urlencoded
  /*****************mysql connection*******************/
  app.use(
      connection(mysql,{
          host: 'localhost',
          user: 'root',
          password : '',
          port : 51526,
          database:'tilawah_bot'
      },'request')
  );
  /*****************************************/
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
//app.get('/users', user.list);
//This is the route the API will call
app.post('/new-message', message.message);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
