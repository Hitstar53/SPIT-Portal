const mongoose = require('mongoose')
const teacherSchema = new mongoose.Schema({
    fullName: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        
    },
    middleName: {
        type: String,
       
    },
    lastName: {
        type: String,
       
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    mobileNumber: {
        type: Number,
        
    },
    id: {
        type: String,
        unique: true
    },
    dateOfBirth: {
        type: String,
        default: ""
    },
    bloodGroup: {
        type: String,
    },
    dateOfJoining: {
        type: String,
        default: ""
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
    gitHubProfile: {
        type: String
    },
    aadharCardNumber: {
        type: Number,
    },
    panCardNumber: {
        type: String,
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
    
    events: [{
        title: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
    },
    ],
    history: {
        type: Array,
    }
});

module.exports = mongoose.model('Faculty', teacherSchema);
