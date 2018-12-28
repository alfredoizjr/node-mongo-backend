
// REQUIERES //
var express = require('express');

// INIT VAR //
var app = express();


app.get('/',( req,res ) =>{
    res.status(200).json({
        message: 'Sussess',
        status: '200'
    })
});

module.exports = app;