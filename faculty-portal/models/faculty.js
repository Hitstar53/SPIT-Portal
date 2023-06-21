const mongoose = require('mongoose')
const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    middleName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
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
        max: 9999999999,
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
    bloodGroup: {
        type: Date,
        required: true,
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
    qualification: {
        type: String,
        required: true
    },
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
        enrollmentKey: {
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
        year: {
            type: Number,
            required: true,
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
        timetable: [{
            startTime: {
                type: Number,
                required: true,
            },
            endTime: {
                type: Number,
                required: true,
            },
            day: {
                type: String,
                required: true,
            },
            roomno: {
                type: Number,
                required: true,
            }
        }],
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
        isePlan: [{
            iseNumber: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            topic: {
                type: String,
                required: true
            },
            modality: {
                type: String,
                required: true
            },
            marks: {
                type: Number,
                required: true
            },
            weightage: {
                type: Number,
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
    aadharCardNumber: {
        type: Number,
        required: true

    },
    panCardNumber: {
        type: Number,
        required: true
    },

    events: [{
        title: {

        },
        startDate: {

        },
        endDate: {

        },
    },
    ],
    history: [{
        type: Object,
    }]
});

module.exports = mongoose.model('Faculty', teacherSchema);
