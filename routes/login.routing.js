
// REQUIERES //
var express = require('express');
var User = require('../models/user.model');
const KEY = require('../config/config').KEY;
var bcrypt = require('bcryptjs');
// INIT VAR //
var app = express();

var jwt = require('jsonwebtoken');



app.post('/',( req,res ) =>{


    User.findOne({email: req.body.email}).exec((err,hasUser) => {

        if (err) {
            return res.status(500).json({
                message: 'error on find credential',
                status: '500',
                err
            });
        }

        if(!hasUser) {
            return res.status(500).json({
                message: 'error on find credential',
                status: '500',
                err:{message: 'Credential incorrect - email'}
            });
        }

        if(!bcrypt.compareSync(req.body.password, hasUser.password)){
            return res.status(500).json({
                message: 'error on credential',
                status: '500',
                err:{message: 'Credential incorrect - password '},
            });
        }


        var token = jwt.sign({user: hasUser},KEY,{expiresIn: '1h'});

        res.status(200).json({
            message: 'Sussess login',
            status: '200',
            token
        })


    });

   
});

module.exports = app;