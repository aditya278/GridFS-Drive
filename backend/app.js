const express = require('express');
const logger = require('morgan');

require('./config/dbConnect')();

const usersRouter = require('./routes/users.route');
const filesRouter = require('./routes/file.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', usersRouter);
app.use('/api/file', filesRouter);

module.exports = app;