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
    HOD: when({
        type: String,
        required: true
    }).when('role').in(['HOD', 'Department Head']),
    HODRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    }
});




const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;