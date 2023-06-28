const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseCode:{type:String,required:true},
    credits:{type:Number,required:true},
    name:{type:String,required:true},
    type:{type:String,required:true},
    teachers:[
        {type:String},
    ]
})

module.exports=mongoose.model("course",courseSchema)