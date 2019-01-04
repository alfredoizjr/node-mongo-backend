// REQUIERES //
var express = require('express');
var User = require('../models/user.model');
var middleware = require('../middleware/auth.midldleware');
var bcrypt = require('bcryptjs');
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

app.post('/',(req, res) => {

    var body = req.body;
    var user = new User({

        name: body.name,
        last: body.last,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
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


//==============================
// EDIT USER
//==============================

app.put('/:id',middleware.verifyToken, (req, res) => {

    User.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true }, (err, updateUser) => {
        if (err) {
            return res.status(400).json({
                message: 'error on user update',
                status: '400',
                err
            });
        }

        res.status(201).json({
            message: 'User Edited',
            status: '201',
            updateUser

        });
    });

});


//==============================
// DELETE USER
//==============================

app.delete('/:id',middleware.verifyToken, (req, res) => {

    User.findByIdAndRemove(req.params.id, (err, deleteUser) => {
        if (err) {
            return res.status(400).json({
                message: 'error on user delete',
                status: '400',
                err
            });
        }


        if (!deleteUser) {
            return res.status(404).json({
                message: 'User is not found',
                status: '404',
                err: { message: 'The user id is not found on the registers' }
            });
        }

        res.status(200).json({
            message: 'User Delete',
            status: '200',
            deleteUser: deleteUser._id

        });
    });

});




module.exports = app;