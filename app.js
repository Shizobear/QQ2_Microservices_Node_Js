const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require("mongoose");

const studentsRoute = require('./routes/students');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/students', studentsRoute);

app.use(function(req, res, next) {

    const error = new Error('not found');
    error.status = 404;
    next(error);

});

app.use(function(error, req, res, ) {

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});


module.exports = app;