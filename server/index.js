const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = module.exports.io = require('socket.io')(http);
const mongoose = require('mongoose');
const router = require('./router');
const socketManager = require('./services/socketManager');
const fakeSeeds = require('./seeds');

mongoose.connect('mongodb://localhost:27017/konnect');
// clear database
// mongoose.connect('mongodb://localhost:27017/konnect', () => mongoose.connection.db.dropDatabase());
mongoose.set('debug', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
router(app);

io.on('connection', socketManager);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log('Server listening on port:', PORT);

  // Seeding fake users
  // fakeSeeds.seedMessages();
  // fakeSeeds.seedUsers();
});
