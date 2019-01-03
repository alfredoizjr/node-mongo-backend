
// REQUIERES //
var express = require('express');
var User = require('../models/user.model');
const KEY = require('../config/config').KEY;
var bcrypt = require('bcryptjs');
// INIT VAR //
var app = express();

var jwt = require('jsonwebtoken');


/*===========================================
* Auth by email
============================================*/

app.post('/', (req, res) => {


    User.findOne({ email: req.body.email }).exec((err, hasUser) => {

        if (err) {
            return res.status(500).json({
                message: 'error on find credential',
                status: '500',
                err
            });
        }

        if (!hasUser) {
            return res.status(500).json({
                message: 'error on find credential',
                status: '500',
                err: { message: 'Credential incorrect - email' }
            });
        }

        if (!bcrypt.compareSync(req.body.password, hasUser.password)) {
            return res.status(500).json({
                message: 'error on credential',
                status: '500',
                err: { message: 'Credential incorrect - password ' },
            });
        }


        var token = jwt.sign({ user: hasUser }, KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Sussess login',
            status: '200',
            token
        });


    });


});




/*===========================================
* Auth by Google 
============================================*/

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = require('../config/config').CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);


 function verify(token) {
    const ticket = client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}



app.post('/google', (err, res) => {

    var token = req.body.token;

    var googleUser = verify(token).catch(err => {


        return res.status(403).json({
            message: 'error on credential',
            status: '403',
            err: { message: 'Credential incorrect' },
        });

    });

    User.findOne({ email: googleUser.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                message: 'error on credential',
                status: '500',
                err
            });
        }

        if (userDB) {

            if (userDB.googleUser === false) {
                return res.status(400).json({
                    message: 'This user is alredy is register',
                    status: '400',
                    err: { message: 'This user is alredy is register' },
                });
            } else {

                var token = jwt.sign({ user: hasUser }, KEY, { expiresIn: '1h' });

                res.status(200).json({
                    message: 'Sussess login',
                    status: '200',
                    token,
                    id: userDB._id
                });
            }
        }else {
            // if not exist create the user

            var user = new User();

            user.name = googleUser.name;
            user.last = googleUser.name;
            user.email = googleUser.email;
            user.password = '::';
            user.img = googleUser.picture;
            user.google = true;

            User.save((err , newUser) => {
                
                res.status(200).json({
                    message: 'Sussess User register',
                    status: '200',
                    token,
                    id: newUser._id
                });
            });

        }


    });


});

module.exports = app;