
// REQUIERES //
var express = require('express');
var mongoose = require('mongoose');

// INIT VAR //
var app = express();

// CONX DB

mongoose.connection.openUri('mongodb://localhost:27017/hospitaldb',{ useNewUrlParser: true, useCreateIndex: true, },(err, res) => {
    if(err) throw err;
    console.log('databases: \x1b[32m%s\x1b[0m','online');
});

// IMPORT ROUTES
var appRoute = require('./routes/app.routing');
var usersRouter = require('./routes/users.routing');


// RUTES
app.use('/users',usersRouter);
app.use('/',appRoute);


// LISTEN REQUEST
app.listen(3000,() =>{
    console.log('server on port 3000: \x1b[32m%s\x1b[0m','online');
});