var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl, {
  useMongoClient: true
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connnected to ' + dburl);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnnected');
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connnection error ' + err);
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination (SIGINT)');
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination (SIGTERM)');
    process.exit(0);
  });
});

process.once('SIGUSR2', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination (SIGUSR2)');
    process.kill(process.pid, 'SIGUSR2');
  });
});

require('./hotels.model.js');
