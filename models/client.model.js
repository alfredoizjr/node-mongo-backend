var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


clientSchema = new Schema({
    name: { type: String, require: [true,'Name of the clien is required']},
    last: { type: String, require: [true,'Lats of the clien is required']},
    email: {type: String, unique: true,required: [true, 'The email is required']},
    phone: { type: Number, require: [true,'Phone number of the clien is required']},
    img:{type: String, required: false},
    user: { type: Schema.Types.ObjectId, ref: 'User' ,required:[true, 'Id user creator is required']}
});


clientSchema.plugin( uniqueValidator, {message: '{PATH} hast to be unique'} );

module.exports = mongoose.model('Client',clientSchema);