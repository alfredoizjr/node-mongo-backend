
// == REQUIERES ==//
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

//== INIT VAR ==//
var app = express();

//== CORS ==//

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow","POST, GET, PUT, DELETE, OPTIONS");
    next();
  });

// === BODY PARSE ==//
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CONX DB

mongoose.connection.openUri('mongodb://localhost:27017/hospitaldb',{ useNewUrlParser: true, useCreateIndex: true, },(err, res) => {
    if(err) throw err;
    console.log('databases: \x1b[32m%s\x1b[0m','online');
});

// IMPORT ROUTES
var appRoute = require('./routes/app.routing');
var loginRouter = require('./routes/login.routing');
var usersRouter = require('./routes/users.routing');
var clientRouter = require('./routes/client.routing');
var projectRouter = require('./routes/project.routing');
var uploadtRouter = require('./routes/upload.routing');
var imgRoute = require('./routes/imagen.routing');


// RUTES
app.use('/image',imgRoute);
app.use('/login',loginRouter);
app.use('/client',clientRouter);
app.use('/user',usersRouter);
app.use('/project',projectRouter);
app.use('/upload',uploadtRouter);
app.use('/',appRoute);


// LISTEN REQUEST
app.listen(3000,() =>{
    console.log('server on port 3000: \x1b[32m%s\x1b[0m','online');
});