const mongoose = require('mongoose')
const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        unique: true
    },
    middleName: {
        type: String,
        unique: true
    },
    lastName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    mobileNumber: {
        type: Number,
        max: 9999999999,
    },
    id: {
        type: String,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    bloodGroup: {
        type: Date,
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
    },
    type: {
        type: String,
    },
    qualification: {
        type: String,
    },
    department: {
        type: String,
    },
    designation: {
        type: String,
    },
    gender: {
        type: String,
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
        },
        courseCode: {
            type: String,
        },
        enrollmentKey: {
            type: String,
        },
        courseType: {
            type: String,
        },
        lecType: {
            type: String,
        },
        class: {
            type: String,
        },
        year: {
            type: Number,
        },
        semester: {
            type: String,
        },
        targetedLectures: {
            type: Number,
            default: 0
        },
        completedLectures: {
            type: Number,
            default: 0
        },
        timetable: [{
            startTime: {
                type: Number,
            },
            endTime: {
                type: Number,
            },
            day: {
                type: String,
            },
            roomno: {
                type: Number,
            }
        }],
        lecPlan: [{
            lecNumber: {
                type: Number,
            },
            topic: {
                type: String,
            },
            suggestedReading: {
                type: String,
            },
        }],
        isePlan: [{
            iseNumber: {
                type: Number,
            },
            date: {
                type: Date,
            },
            topic: {
                type: String,
            },
            modality: {
                type: String,
            },
            marks: {
                type: Number,
            },
            weightage: {
                type: Number,
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
    },
    panCardNumber: {
        type: Number,
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
