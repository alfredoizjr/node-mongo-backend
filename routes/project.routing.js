// REQUIERES //
var express = require('express');
var Project = require('../models/project.model');
var middleware = require('../middleware/auth.midldleware');
// INIT VAR //
var app = express();


//==============================
// GET LIST OF PROJECTS
//=============================

app.get('/', (req, res) => {


    Project.find({})
        .populate('user','name last email')
        .populate('client','name last email phone')
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
// CREATE A PROJECT
//==============================

app.post('/', middleware.verifyToken,(req, res) => {

    var body = req.body;
    var project = new Project({

        name: body.name,
        user: req.user._id,
        client: body._id
    });

    project.save((err, newproject) => {
        if (err) {
            return res.status(400).json({
                message: 'error on project register',
                status: '400',
                err
            });
        }

        res.status(201).json({
            message: 'Project create',
            status: '201',
            newproject

        });
    });
});


//==============================
// EDIT PROJECT
//==============================

app.put('/:id',middleware.verifyToken, (req, res) => {

    Project.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true }, (err, updateProject) => {
        if (err) {
            return res.status(400).json({
                message: 'error on project update',
                status: '400',
                err
            });
        }

        res.status(201).json({
            message: 'Project edited susses',
            status: '201',
            updateProject

        });
    });

});


//==============================
// DELETE PROJECT
//==============================

app.delete('/:id',middleware.verifyToken, (req, res) => {

    Project.findByIdAndRemove(req.params.id, (err, deleteProject) => {
        if (err) {
            return res.status(400).json({
                message: 'error on project delete',
                status: '400',
                err
            });
        }


        if (!deleteProject) {
            return res.status(404).json({
                message: 'User is not found',
                status: '404',
                err: { message: 'The project id is not found on the registers' }
            });
        }

        res.status(200).json({
            message: 'Project Delete susses',
            status: '200',
            deleteProject: deleteProject._id

        });
    });

});



module.exports = app;
