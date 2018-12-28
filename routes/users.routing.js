// REQUIERES //
var express = require('express');
var User = require('../models/user.model');
// INIT VAR //
var app = express();


//==============================
// GET LIST OF USERS
//=============================

app.get('/', (req, res) => {


    User.find({},
        'name last email img role')
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        message: 'error  for get users',
                        status: '500',
                        err
                    });
                }

                res.status(200).json({
                    message: 'Get users',
                    status: '200',
                    users

                });
            });

});


//==============================
// CREATE A USER
//==============================

app.post('/', (req, res) => {

var body = req.body;
var user = new User({

    name: body.name,
    last: body.last,
    email: body.email,
    password: body.password,
    img: body.img,
    role: body.role
});

user.save((err, newUser) => {
    if (err) {
        return res.status(400).json({
            message: 'error on user register',
            status: '400',
            err
        });
    }

    res.status(201).json({
        message: 'User create',
        status: '201',
        newUser
    
    });
});

});

module.exports = app;