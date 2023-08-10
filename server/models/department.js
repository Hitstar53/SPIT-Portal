const mongoose = require('mongoose');
const when = require('mongoose-when');
const departmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    floor: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    HOD: {
        type: String,
        required: true,
    },
});




module.exports = mongoose.model('Department', departmentSchema);