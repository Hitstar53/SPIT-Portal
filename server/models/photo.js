const mongoose = require('mongoose')
const photoSchema = mongoose.Schema({
    photoURI: {type:String},
    emailID:{type:String,required:true}
},
{
    collection:"Photos"
})
module.exports = mongoose.model('photo',photoSchema)