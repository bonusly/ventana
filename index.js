"use script";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

// Run server to listen on port 8888.
const server = app.listen(8888, () => {
  console.log('listening on *:8888');
});

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname+'/views');
app.set('view engine', 'pug');

const io = require('socket.io')(server);

// Set socket.io listeners.
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//Express Routes
app.get('/:guid', function(request, response){
  var guid = request.params.guid;  
  result = get_data(guid);
  response.render('index.pug', {title: 'Project Ventana', links: result});
});



//Hit the BONSULY endpoint and get some data
function get_data(guid){
  request('https://bonus.ly/api/v1/bonuses?access_token='+guid, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      return body;
    }
  })
}