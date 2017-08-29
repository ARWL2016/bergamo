const chalk = require('chalk');
const mongoose = require('mongoose');
const VotingTopic = require('./models/voting-topic');
const User = require('./models/user');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(chalk.green('mongoose connected to: ' + process.env.MONGODB_URI));
});

mongoose.connection.on('error', (err) => {
  console.log(chalk.red('mongoose connection error: ' + err));
});

module.exports = {
  mongoose,
  User
}

