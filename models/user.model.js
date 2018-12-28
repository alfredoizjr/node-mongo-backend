var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: [true, 'The name is required']},
    last: {type: String, required: [true, 'The last is required']},
    email: {type: String, unique: true,required: [true, 'The email is required']},
    password: {type: String,required: [true, 'The password is required']},
    img: {type: String,required: false},
    role: {type: String,required: false, default: 'USER_ROLE'},
});
module.exports = mongoose.model('User', userSchema);