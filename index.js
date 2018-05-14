const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const mongoose = require('mongoose');
const io = require('socket.io')(http);
const redis = require('redis');
const router = require('./router');

mongoose.connect('mongodb://localhost:27017/konnect');
mongoose.set('debug', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});