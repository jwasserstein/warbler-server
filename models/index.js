const mongoose = require('mongoose');
const User     = require('./user');
const Message  = require('./message');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/warbler', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, keepAlive: true});

module.exports = { User, Message };