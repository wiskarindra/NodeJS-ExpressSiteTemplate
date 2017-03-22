
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
const axios = require('axios')



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
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('/', routes.index);
//app.get('/users', user.list);
//This is the route the API will call
app.post('/new-message', function(req, res) {
	const message = req.body
  console.log(message);
  console.log(message.text);
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (!message || message.text.toLowerCase().indexOf('marco') <0) {
    // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
    return res.end()
  }

  // If we've gotten this far, it means that we have received a message containing the word "marco".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
  // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
  axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
    chat_id: message.chat.id,
    text: 'Test'
  })
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })

});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
