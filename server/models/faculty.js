const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facultySchema = new Schema({
    emailID: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    announcements: [ {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Announcements'
    },]
},
{collection: 'Faculty'});

module.exports = mongoose.model('faculty', facultySchema);