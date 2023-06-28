const mongoose = require('mongoose')
const announcementSchema = mongoose.Schema({
    sender:{type:String,required:true},
    description:{ type : String, required:true},
    senderPhoto:{type:mongoose.Schema.Types.Mixed,required:true},
    type:{type:String,required:true}
})

module.exports = mongoose.model("announcemnets",announcementSchema)