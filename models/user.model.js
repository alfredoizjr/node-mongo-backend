var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var rolesValidate = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} is not a valid role'
}


var userSchema = new Schema({
    name: {type: String, required: [true, 'The name is required']},
    last: {type: String, required: [true, 'The last is required']},
    email: {type: String, unique: true,required: [true, 'The email is required']},
    password: {type: String,required: [true, 'The password is required']},
    img: {type: String,required: false},
    role: {type: String,required: false, default: 'USER_ROLE', enum: rolesValidate},
});

userSchema.plugin( uniqueValidator, {message: '{PATH} hast to be unique'} );

module.exports = mongoose.model('User', userSchema);