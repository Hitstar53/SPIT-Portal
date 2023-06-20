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
    courses: [{
        courseName: {
            type: String,
            required: true
        },
        courseCode: {
            type: String,
            required: true
        },
        courseType: {
            type: String,
            required: true
        },
        lecType: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        semester: {
            type: String,
            required: true
        },
        targetedLectures: {
            type: Number,
            required: true,
            default: 0
        },
        completedLectures: {
            type: Number,
            required: true,
            default: 0
        },
        lecPlan: [{
            lecNumber: {
                type: Number,
                required: true
            },
            topic: {
                type: String,
                required: true
            },
            suggestedReading: {
                type: String,
                required: true
            },
        }],
    }],
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

module.exports = mongoose.model('Faculty', teacherSchema);
