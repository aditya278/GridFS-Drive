var express = require('express');
var logger = require('morgan');

require('./config/dbConnect')();

var usersRouter = require('./routes/users.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', usersRouter);

module.exports = app;