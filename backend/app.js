const express = require('express');
const logger = require('morgan');
const path = require('path');

require('./config/dbConnect')();

const usersRouter = require('./routes/users.route');
const filesRouter = require('./routes/file.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.use('/api/user', usersRouter);
app.use('/api/file', filesRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..","frontend", "build", "index.html"));
})

module.exports = app;