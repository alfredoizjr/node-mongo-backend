// REQUIERES //
var express = require('express');
var Client = require('../models/client.model');
var middleware = require('../middleware/auth.midldleware');
var bcrypt = require('bcryptjs');
// INIT VAR //
var app = express();


//==============================
// GET LIST OF USERS
//=============================

app.get('/', (req, res) => {


    Client.find({}).populate('user', 'name last email').exec((err, users) => {
        if (err) {
            return res.status(500).json({
                message: 'error  for get users',
                status: '500',
                err
            });
        }

        res.status(200).json({
            message: 'Get client',
            status: '200',
            users

        });
    });

});


//==============================
// CREATE A USER
//==============================

app.post('/', middleware.verifyToken, (req, res) => {

    var body = req.body;
    var client = new Client({

        name: body.name,
        last: body.last,
        email: body.email,
        phone: body.phone,
        img: body.img,
        user: req.user._id
    });

    client.save((err, newClient) => {
        if (err) {
            return res.status(400).json({
                message: 'error on client register',
                status: '400',
                err
            });
        }

        res.status(201).json({
            message: 'Client create',
            status: '201',
            newClient

        });
    });
});

//==============================
// EDIT CLIENT
//==============================

app.put('/:id', middleware.verifyToken, (req, res) => {

    Client.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true })
        .populate('user', 'name last email')
        .exec((err, clientUpdate) => {
            if (err) {
                return res.status(400).json({
                    message: 'error on user client',
                    status: '400',
                    err
                });
            }

            res.status(201).json({
                message: 'Client Edited',
                status: '201',
                clientUpdate

            });
        });

});


//==============================
// DELETE CLIENT
//==============================

app.delete('/:id',middleware.verifyToken, (req, res) => {

    Client.findByIdAndRemove(req.params.id, (err, deleteClient) => {
        if (err) {
            return res.status(400).json({
                message: 'error on client delete',
                status: '400',
                err
            });
        }

        if (!deleteClient) {
            return res.status(404).json({
                message: 'Client is not found',
                status: '404',
                err: { message: 'The client id is not found on the registers' }
            });
        }

        res.status(200).json({
            message: 'Client delete sussess',
            status: '200',
            deleteClient: deleteClient._id

        });
    });

});


module.exports = app;