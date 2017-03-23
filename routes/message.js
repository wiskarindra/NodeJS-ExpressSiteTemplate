
/*
 * POST new-message.
 */

 const axios = require('axios')
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'ap-cdbr-azure-east-c.cloudapp.net',
   user     : 'b4ce711cfa7124',
   password : 'd06fc412',
   port     : 3306,
   database : 'd06fc412'
 });

exports.message = function(req, res){
  const message = req.body
  console.log(message);
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
  if (!message)
  {
    // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
    return res.end()
  }

  console.log(message.message.text);
  var from = message.message.from
  var chat = message.message.chat

  if (message.message.text.indexOf("/start") == 0)
  {
    if (message.message.text.split(" ").length == 2)
    {
      console.log('You are now connected...')
      var target = message.message.text.split(" ")[1];
      var post_user  = {user_id: from.id, user_name: from.first_name + " " + from.last_name, target: target, created_at: new Date()};
      connection.query('INSERT INTO telegram_user SET ?', post_user, function(err, result) {
        if (err)
        {
          axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
            chat_id: chat.id,
            text: 'User dengan nama ' + from.first_name + " " + from.last_name + ' sudah terdaftar'
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
        }
        else
        {
          axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
            chat_id: chat.id,
            text: 'Bismillah, terima kasih ' + from.first_name + " " + from.last_name
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
        }

      })
    }
    else
    {
      axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
        chat_id: chat.id,
        text: 'Mohon masukkan jumlah target'
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
    }

  }
  else if (message.message.text.indexOf("/iqob") == 0)
  {
    if (message.message.text.split(" ").length == 2)
    {
      console.log('You are now connected...')
      var iqob = message.message.text.toLowerCase().split(" ")[1];
      var post_group = {group_id: chat.id, group_name: chat.title, created_at: new Date() }
      connection.query('INSERT INTO telegram_group SET ?', post_group, function(err, result)
      {
        if (err)
        {
          console.log('sudah terdaftar')
          axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
            chat_id: chat.id,
            text: 'Group '+ chat.title + ' sudah terdaftar'
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
        }
        else
        {
          console.log('grup berhasil dibuat')
          axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
            chat_id: chat.id,
            text: 'Group '+ chat.title + ' berhasil didaftarkan dengan iqob '+ iqob
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
        }
      })
    }
    else
    {
      axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
        chat_id: chat.id,
        text: 'Mohon masukkan jumlah iqob'
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
    }

  }
  else if (message.message.text.indexOf("/tilawah") == 0)
  {
    console.log('You are now connected...')
    var iqob = message.message.text.toLowerCase().split(" ")[1];
    var post = {user_id: from.id, group_id: chat.id, status: "tilawah", created_at: new Date() }
    connection.query('INSERT INTO user_tilawah SET ?', post, function(err, result)
    {
      if (err)
      {
        console.log('sudah terdaftar')
        axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
          chat_id: chat.id,
          text: err + " " +  from.id + " " + chat.id
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
      }
      else
      {
        console.log('grup berhasil dibuat')
        axios.post('https://api.telegram.org/bot345596833:AAGDBsKognVh4J4ALq23Sn6bmX-Dt1EfA2A/sendMessage', {
          chat_id: chat.id,
          text: '😇 Alhamdulillah'
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
      }
    })
  }

};
