var mongoose = require('mongoose');
var Schema = mongoose.Schema;


projectSchema = new Schema({
    name: { type: String, require: [true,'Name of the clien is required']},
    img:{type: String, required: false},
    user: { type: Schema.Types.ObjectId, ref: 'User' ,required:[true, 'Id user creator is required']},
    client: { type: Schema.Types.ObjectId, ref: 'Client' ,required:[true, 'Id client creator is required']}
});


module.exports = mongoose.model('Project',projectSchema);