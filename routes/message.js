
/*
 * POST new-message.
 */

 const axios = require('axios')
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'tilawah_bot',
   password : 'tilawah_bot',
   port     : 51526,
   database : 'tilawah_bot'
 });

exports.message = function(req, res){
  const message = req.body
  //console.log(message);
  console.log(message.message.text);
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (!message || message.message.text.toLowerCase().indexOf('/start') <0) {
    // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
    return res.end()
  }
  var target = message.message.text.toLowerCase().split(" ")[1];

  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
    var from = message.message.from
    var post  = {user_id: from.id, user_name: from.first_name + " " + from.last_name, target: target, created_at: new Date()};
    connection.query('INSERT INTO telegram_user VALUES ?', post, function(err, result) {
      if (err) throw err
      console.log('masuk')
    })
  })

  // If we've gotten this far, it means that we have received a message containing the word "marco".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
  // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
  axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
    chat_id: message.message.chat.id,
    text: 'Bismillah, this bot is under construction'
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
};
