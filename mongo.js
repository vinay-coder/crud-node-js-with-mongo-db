const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise=global.Promise;


// mongoose.connect('mongodb://localhost:5000/node-mongo',{ useNewUrlParser:true });

mongoose.connect(process.env.MONGO_URL, {
    auth: {
      user:'nodejsUser',
      password:'nodejs@vinay1'
    },
    useNewUrlParser:true
  }, function(err, client) {
    if (err) {
      console.log(err);
    }
    console.log('connect!!!');
  });