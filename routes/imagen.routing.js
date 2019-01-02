
// REQUIERES //
var express = require('express');

// INIT VAR //
var app = express();

const path = require('path');
const fs = require('fs');


app.get('/:type/:img',( req,res ) =>{


    var type = req.params.type;
    var img = req.params.img;

    var pathImg = path.resolve(__dirname, `../upload/${ type }/${ img }`);

    if(fs.existsSync(pathImg)){

        res.sendFile( pathImg );
    } else {
        pathNoImg = path.resolve(__dirname, `../assets/img/no-img.jpg`);
        res.sendFile( pathNoImg );
    }

});

module.exports = app;