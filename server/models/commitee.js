const mongoose = require('mongoose')
const committeeSchema = mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    facultyMentor:{ type : String, required:true},
    members:[{
        name:{ type : String, required:true},
        position:{ type : String, required:true},},
    ],
    logo:{type:mongoose.Schema.Types.Mixed,required:true},
    comAnnouncements:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Announcements'
    }],
    comEvents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Announcements'
    }]
}
,{
    collection:"committee"
})

module.exports = mongoose.model("committee",committeeSchema)