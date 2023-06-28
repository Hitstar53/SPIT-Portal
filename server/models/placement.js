const mongoose = require('mongoose')
const placementSchema = mongoose.Schema({
    uid:{ type : Number, required:true},
    comapanyName:{ type : String, required:true},
    contactNo:{ type : String, required:true},
    address:{ type : String, required:true},
    role:{ type : String, required:true},
    description:{ type : String, required:true},
    doj:{ type : Date, required:true},
    ctc:{ type : String, required:true},
},{
    collection:"placement"
})

module.exports = mongoose.model("placement",placementSchema)