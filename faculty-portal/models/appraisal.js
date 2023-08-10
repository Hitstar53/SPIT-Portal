const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    yearofAssesment: {
        type: String,
    },
    facultyName: {
        type: String,
    },
    department: {
        type: String,
    },
    designation: {
        type: String,
    },
    Dimension1: {
        info: {
            courses: [
                {
                    name: {
                        type: String,
                        default: null
                    },
                    class: {
                        type: String,
                        default: null
                    },
                    sem: {
                        type: Number,
                        default: null
                    },
                    AP2MarksObtained: {
                        type: Number,
                        default: 0
                    },
                    AP3LecturesTarget: {
                        type: Number,
                        default: 0
                    },
                    AP3LectureConducted: {
                        type: Number,
                        default: 0

                    },
                    AP3PercentAchieved: {
                        type: Number,
                        default: 0
                        // max: 100
                    },
                    AP4PercentFeedback: {
                        type: Number,
                        default: 0
                        // max: 100
                    },
                    AP5AttendanceStudent: {
                        type: Number,
                        default: 0
                    },
                    
                },
            ],

            AP1Marks: {
                type: Number,
                default: 0,
                // max: 10
            },
            AP2Average: {
                type: Number,
                //max: 10
                default: 0
            },
            AP2Marks: {
                type: Number,
                //max: 10   
                default: 0
            },
            AP3Average: {
                type: Number,
                //max: 30
                default: 0
            },
            AP3Marks: {
                type: Number,
                //max: 30
                default: 0
            },
            AP4Marks: {
                type: Number,
                //max: 30
                default: 0

            },
            AP5Average: {
                type: Number,
                //max: 5
                default: 0
            },
            AP5Marks: {
                type: Number,
                // max: 5
                default: 0
            },
            
        },

        AP6: {
            menteeFeedback: [
                {
                    type: Number, 
                },
            ],
            averageMarks: {
                type: Number,
                default: 0,
            },
        },
        AP7: {
            guestLectureData: [
                {
                    date: {
                        type: String,
                    },
                    title: {
                        type: String,
                    },
                    speakerName: {
                        type: String,
                    },
                    arrangedFor: {
                        type: String,
                    },
                },
            ],

            totalMarks: {
                type: Number,
                default: 0,
            },
        },

        AP8: {
            remedialData: [{
                sem: {
                    type: Number,
                    default: 0
                },
                subject: {
                    type: String
                },
                activityDetails: {
                    type: String
                }
            }],
            totalMarks: {
                type: Number,
                default: 0
            }
        },

        AP9: {
            noteworthyData: [{
                sem: {
                    type: Number
                },
                subject: {
                    type: String
                },
                marksOutOf10: {
                    type: Number,
                    default: 0
                },
                activityDetails: {
                    type: String
                }
            }],
            average: {
                type: Number,
                default: 0
            }
        },

        AP10: {
            paper: [
                {
                    course: {
                        type: String,
                    },
                    sem: {
                        type: Number,
                    },
                    marks: {
                        type: Number,
                        default: 0
                    },
                },
            ],
            averageMarks: {
                type: Number,
                default: 0
            },
        },

        totalMarks: {
            type: Number,
            default: 0
        },
    },

    Dimension2: {
        RP1: {
            papers: [
                {
                    title: {
                        type: String,
                    },
                    conferenceOrJournal: {
                        name: {
                            type: String,
                        },
                        type: {
                            type: String,
                             
                        },
                        reputation: {
                            type: String,
                            
                        },
                    },
                    author: {
                        type: String,
                    },
                    publisher: {
                        type: String,
                    },
                    paperLink: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
                // max: 30
                default: 0
            },
        },
        
        RP2: {
            patents: [
                {
                    name: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                    status: {
                        type: String,
                       
                    },
                },
            ],
            patentMarks: {
                type: Number
            },
            books: [
                {
                    title: {
                        type: String,
                    },
                    author: {
                        type: String,
                    },
                    publisher: {
                        type: String,
                    },
                    status: {
                        type: String,
                       
                    },
                },
            ],
            booksMarks: {
                type: Number
            },
            moocs: [
                {
                    name: {
                        type: String,
                    },
                    duration: {
                        type: Number,
                        

                    },
                    details: {
                        type: String,
                    },
                },
            ],
            moocsMarks: {
                type: Number
            },
            totalMarks: {
                type: Number,
                max: 30,
            },
        },
        RP3: {
            sponsored: [
                {
                    date: {
                        type: String,
                    },
                    title: {
                        type: String,
                    },
                    agency: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                    amount: {
                        type: Number,
                        default: 0,
                    },
                    status: {
                        type: String,
                        default: "Null",
                        
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        RP4: {
            number: {
                type: Number,
                default: null
            },
            totalMarks: {
                type: Number,
               
            },
        },

        RP5: {
            selfDevelopment: [
                {
                    type: {
                        type: String,
                        
                    },
                    title: {
                        type: String,
                    },
                    organization: {
                        type: String,
                    },
                    dates: {
                        type: String,
                    },
                    duration: {
                        type: Number,
                       
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        RP6: {
            softHardDev: [
                {
                    type: {
                        type: String,
                    },
                    model: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
               
            },
        },

        RP7: {
            activityNotCovered: [
                {
                    date: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
               
            },
        },

        totalMarks: {
            type: Number,
        },
    },
    Dimension3: {
        IP1: [
            {
                role: {
                    type: String,
                    
                },
                tick: {
                    type: Boolean,
                    
                },
                marks: {
                    type: Number,
                    default: 20,
                },
            },
        ],
        IP2: [
            {
                role: {
                    type: String,
                },
                tick: {
                    type: Boolean,
                },
                marks: {
                    type: Number,
                    default: 10,
                },
            },
        ],
        DP1: [
            {
                role: {
                    type: String,
                },
                tick: {
                    type: Boolean,
                },
                marks: {
                    type: Number,
                    default: 10,
                },
            },
        ],
        totalIP1IP2DP1Marks: {
            type: Number,
        },
        OP1: {
            organized: [
                {
                    name: {
                        type: String,
                    },
                    type: {
                        type: String,
                        
                    },
                    sponsorerName: {
                        type: String,
                    },
                    fund: {
                        type: Number,
                    },
                    days: {
                        type: Number,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },
        Invited: {
            invitedAt: [
                {
                    industryName: {
                        type: String,
                    },
                    dates: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                    type: {
                        type: String,
                       
                    },
                    duration: {
                        type: Number,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        op3: {
            receivedFDP: [
                {
                    name: {
                        type: String,
                    },
                    type: {
                        type: String,
                        
                    },
                    sponsorerName: {
                        type: String,
                    },
                    fund: {
                        type: Number,
                    },
                    days: {
                        type: Number,
                    },
                },
            ],
            totalMarks: {
                type: Number
            }
        },

        op4: {
            invitedTalk: [
                {
                    industryName: {
                        type: String,
                    },
                    dates: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        Partof: {
            committee: [
                {
                    name: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                    organization: {
                        type: String,
                    },
                    date: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        Article: {
            articleDetails: [{
                name: {
                    type: String,
                },
            }],
            totalMarks: {
                type: Number,
            },
        },

        ngo: {
            data: [
                {
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        coGuide: {
            data: [
                {
                    institutionName: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        collaboration: {
            institutionDetails: [
                {
                    name: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },
        totalMarks: {
            type: Number,
        },
    },

    Dimension4: {
        feedbackMarks: {
            A: {
                type: Number,
                default: 0,
            },
            B: {
                type: Number,
                default: 0,
            },
            C: {
                type: Number,
                default: 0,
            },

            E: {
                type: Number,
            },
        },

        confidentialReport: {
            HODRemarks: {
                type: String,
                default: null,
            },

            principalRemarks: {
                type: Number,
                default: 0,
            },

            perceptionMarks: {
                type: Number,
                default: 0,
            },

            principalComments: {
                type: String,
            },

            bonusMarks: {
                type: Number,
                default: 0,
            },
        },
    },

    finalGrandTotal: {
        dimension1: {
            totalMarks: {
                type: Number,
                default: 0,
            },
            multiplyingFactor: {
                type: Number,
                default: 0.4,
            },
            finalMarks: {
                type: Number,
                default: 0,
            },
        },
        dimension2: {
            totalMarks: {
                type: Number,
                default: 0,
            },
            multiplyingFactor: {
                type: Number,
                default: 0.2,
            },
            finalMarks: {
                type: Number,
                default: 0,
            },
        },
        dimension3: {
            totalMarks: {
                type: Number,
                default: 0,
            },
            multiplyingFactor: {
                type: Number,
                default: 0.2,
            },
            finalMarks: {
                type: Number,
                default: 0,
            },
        },
        dimension4: {
            totalMarks: {
                type: Number,
                default: 0,
            },
            multiplyingFactor: {
                type: Number,
                default: 0.2,
            },
            finalMarks: {
                type: Number,
                default: 0,
            },
        },

        GrandTotal: {
            type: Number,
            default: 0,
        },
    },
    isSubmitted: {
        type: Boolean,
        default: false,
    },
    principalReviewed: {
        type: Boolean,
        default: false,
    },
    HODReviewed: {
        type: Boolean,
        default: false,
    },

    HODcomments: [{
        type: String,
    }],

});

const Appraisal = mongoose.model('Appraisal', appraisalSchema);

module.exports = Appraisal;