// REQUIERES //
var express = require('express');
var middleware = require('../middleware/auth.midldleware');
var fileUpload = require('express-fileupload');
var fs = require('fs');

// INIT VAR //
var app = express();

// models

var User = require('../models/user.model');
var Client = require('../models/client.model');
var Project = require('../models/project.model');

// default options
app.use(fileUpload());

app.put('/:type/:id', (req, res) => {

    var type = req.params.type;
    var id = req.params.id;

    // type of collection

    var typeAllowed = ['users', 'clients', 'projects'];


    if (typeAllowed.indexOf(type) < 0) {

        return res.status(500).json({
            message: 'error  type is not valid',
            status: '400',
            err: { message: 'The collection was especify is not allowed' }
        });

    }

    if (!req.files) {

        return res.status(500).json({
            message: 'error  for get files for upload',
            status: '400',
            err: { message: 'The upload field is empty' }
        });

    }

    // Get name of the file

    var archive = req.files.image;
    var cutName = archive.name.split('.');

    // get ext
    var ext = cutName[cutName.length - 1];

    // ext allowed

    var extAllowed = ['png', 'jpg', 'jpeg', 'gif'];

    if (extAllowed.indexOf(ext) < 0) {
        return res.status(500).json({
            message: 'The type of file is not allowed',
            status: '400',
            err: { message: 'The upload field ext is not permited' }
        });
    }

    // Name of the file custom

    var nameCutomFile = `${id}-${new Date().getMilliseconds()}.${ext}`;


    // move archive

    var path = `./upload/${type}/${nameCutomFile}`;

    archive.mv(path, err => {

        if (err) {
            return res.status(500).json({
                message: 'error  try upload file',
                status: '500',
                err
            });
        }

        uploadByType(type, id, nameCutomFile, res)

    });


});


function uploadByType(type, id, nameCutomFile, res) {

    if (type === 'users') {

        User.findById(id, (err, user) => {

        if(!user) {
            return res.status(400).json({
                message: "error  user don't exist",
                status: '400',
                err:{message: "Is not any register with that id"}
            });
        }

            var pathOld = './upload/users/' + user.img;

            // validate path old exist delete img was before
            if (fs.existsSync(pathOld)) {

                fs.unlink(pathOld);

            }

            user.img = nameCutomFile;

            user.save((err, userUpdate) => {


                if (err) {

                    return res.status(500).json({
                        message: 'error  try update user img',
                        status: '500',
                        err
                    });
                }

                userUpdate.password = ':::';

                return res.status(200).json({
                    message: 'User update susses',
                    status: '200',
                    userUpdate
                });

            });

        })

    }

    if (type === 'client') {

        Client.findById(id, (err, client) => {


            if (err) {

                return res.status(500).json({
                    message: 'error  try update client img',
                    status: '500',
                    err
                });

            }


            if(!client) {
                return res.status(400).json({
                    message: "error  user don't exist",
                    status: '400',
                    err:{message: "Is not any register with that id"}
                });
            }

            var pathOld = './upload/clienta/' + client.img;

            // validate path old exist delete img was before
            if (fs.existsSync(pathOld)) {

                fs.unlink(pathOld);

            }

            client.img = nameCutomFile;
            client.save((err, clientUpdate) => {

                if (err) {

                    return res.status(500).json({
                        message: 'error  try update user img',
                        status: '500',
                        err
                    });
                }



                return res.status(200).json({
                    message: 'User update susses',
                    status: '200',
                    clientUpdate
                });
            });






        });

    }

    if (type === 'projects') {


        Porject.findById(id, (err, project) => {

            if (err) {

                return res.status(500).json({
                    message: 'error  try update project img',
                    status: '500',
                    err
                });

            }

            if(!project) {
                return res.status(400).json({
                    message: "error  user don't exist",
                    status: '400',
                    err:{message: "Is not any register with that id"}
                });
            }

            var pathOld = './upload/project/' + client.img;

            // validate path old exist delete img was before
            if (fs.existsSync(pathOld)) {

                fs.unlink(pathOld);

            }

            client.img = nameCutomFile;
            client.save((err, projectUpdate) => {

                if (err) {

                    return res.status(500).json({
                        message: 'error  try update user img',
                        status: '500',
                        err
                    });
                }



                return res.status(200).json({
                    message: 'User update susses',
                    status: '200',
                    projectUpdate
                });
            });

        });

    }

}

module.exports = app;
