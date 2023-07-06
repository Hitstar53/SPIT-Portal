const mongoose = require('mongoose')
const announcementSchema = mongoose.Schema({
    sender:{type:String,required:true},
    description:{ type : String, required:true},
    senderPhoto:{type:String,required:true},
    type:{type:String,required:true},
    postDate:{type:String,required:true},
    title:{type:String,required:true},
    endDate:{type:String,required:true}
},
{
    collection:"Announcements"
})

module.exports = mongoose.model("Announcements",announcementSchema)