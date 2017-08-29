
let env = process.env.NODE_ENV || 'development';
console.log('ENV: ', env);


//maintain development JSON file separately and don't add to source control
if (env === 'development') {
  const config = require('./development.json');
  console.log(config);
  process.env.JWT_SECRET = config.JWT_SECRET;
  process.env.MONGODB_URI = config.MONGODB_URI;
  console.log(process.env.MONGODB_URI);
}

