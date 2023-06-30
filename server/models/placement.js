const mongoose = require('mongoose')
const placementSchema = mongoose.Schema({
    emailID:{type : String,required : true},
    companyName:{ type : String, required:true},
    contactNo:{ type : String, required:true},
    address:{ type : String, required:true},
    role:{ type : String, required:true},
    description:{ type : String, required:true},
    doj:{ type : String, required:true},
    ctc:{ type : String, required:true},
},{
    collection:"placement"
})

module.exports = mongoose.model("placement",placementSchema)