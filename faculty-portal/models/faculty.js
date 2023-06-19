const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        max: 10,
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateOfJoining: {
        type: Date,
        required: true,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    qualification: [{
        type: String,
        required: true
    }],
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    specialization: [{
        type: String,
    }],
    classIncharge: {
        type: String,

    },
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    linkedinProfile: {
        type: String
    },
    aadharCard: {
        data: Buffer,
        contentType: String
    },
    panCard: {
        data: Buffer,
        contentType: String
    }

});

const Faculty = mongoose.model('Faculty', teacherSchema);

module.exports = Faculty;