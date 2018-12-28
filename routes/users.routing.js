// REQUIERES //
var express = require('express');
var Users = require('../models/user.model');
// INIT VAR //
var app = express();


app.get('/', (req, res) => {


    Users.find({},
        'name last email img role')
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        message: 'error on user register',
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

module.exports = app;