const mongoose = require('mongoose')
const eventSchema = mongoose.Schema({
    date:{type:Date,required:true},
    name:{ type : String, required:true},
    organizedBy:{ type : String, required:true},
    description:{ type : String, required:true},
})

module.exports = mongoose.model("events",eventSchema)