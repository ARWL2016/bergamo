const express = require('express');
const app = express();
const routes = require('./routes');

const { mongoose, VotingTopic } = require('./db'); 

let port = process.env.PORT || 3000;


routes(app);


app.listen(port, () => {
  console.log('API Running on Port ' + port);
})
