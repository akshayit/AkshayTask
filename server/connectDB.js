const mongoose = require('mongoose');
let config = require('./config/config.js');

module.exports = () => {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(error => console.error(error.stack));
  //Get the default connection
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}