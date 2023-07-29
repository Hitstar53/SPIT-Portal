const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const facultySchema = new Schema({
    emailID: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    announcements: [ {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Announcements'
    },],
    upcomingExams:[
        {
            date:{ type : String, required:true},
            syllabus:{ type : String, required:true},
            type:{ type : String, required:true},
            courseName:{ type : String, required:true},
            sendTo:{ type : String, required:true},
        }
    ],
    isAdmin:{type:Boolean,required:true},
},
{collection: 'Faculty'});

module.exports = mongoose.model('faculty', facultySchema);