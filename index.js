const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});