const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    teacherName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    Dimension1: {
        AP1: {
            courseData: [{
                courseName: {
                    type: String
                },
                class: {
                    type: String
                },
                sem: {
                    type: String
                },
                marksObtained: [{
                    type: Number
                }],
            }],
            marks: {
                type: Number
            }
        },
        AP2: {
            averageMarks: {
                type: Number
            },
            marks: {
                type: Number
            }
        },
        AP3: {
            courseData: [{
                courseName: {
                    type: String
                },
                targetedLectures: {
                    type: Number
                },
                completedLectures: {
                    type: Number
                },
                percentTargetAchieved: {
                    type: Number
                }
            }],
            averagePercentage: {
                type: Number
            }
        },
        AP4: {
            semData: [{
                sem: {
                    type: String
                },
                subject: {
                    type: String
                },
                percentFeedback: {
                    type: Number
                }
            }],
            marks: {
                type: Number
            }

        },
        AP5: {
            attendance: [{
                type: Number
            }],
            averageAttendance: {
                type: Number
            },
            marks: {
                type: Number
            }
        },
        AP6: {
            menteeFeedback: [{
                type: String
            }],
            averageMarks: {
                type: Number
            }
        },
        AP7: {
            guestLectureData: [{
                date: {
                    type: Date
                },
                title: {
                    type: String
                },
                speakerName: {
                    type: String
                },
                arrangedFor: {
                    type: String
                }
            }],
            totalMarks: {
                type: Number
            }

        },
        AP8: {
            activityData: [{
                sem: {
                    type: Number
                },
                subject: {
                    type: String
                },
                activity: {
                    type: String
                }
            }],
            totalMarks: {
                type: Number
            }
        },
        AP9: {
            activityData: [{
                semester: {
                    type: String
                },
                subject: {
                    type: String
                },
                activityDetails: {
                    type: String
                }
            }],
            average: {
                type: Number
            }
        },
        AP10: {
            paper: [{
                course: {
                    type: String
                },
                marks: {
                    type: Number
                }
            }],
            averageMarks: {
                type: Number
            }
        },

        totalMarks: {
            type: Number
        }

    },

    Dimension2: {
        papers:
            [{
                title: {
                    type: String
                },
                journal: {
                    type: String
                },
                author: {
                    type: String
                },
                publisher: {
                    type: String
                },
                paperLink: {
                    type: String
                }
            }
            ],
        patents: [
            {
                name: {
                    type: String
                },
                details: {
                    type: String
                }
            }
        ],
        books: [
            {
                title: {
                    type: String
                },
                author: {
                    type: String
                },
                publisher: {
                    type: String
                }

            }
        ],
        moocs: [
            {
                name: {
                    type: String
                },
                duration: {
                    type: String
                },
                details: {
                    type: String
                }
            }
        ],
        sponsored: [
            {
                date: {
                    type: Date
                },
                title: {
                    type: String
                },
                agency: {
                    type: String
                },
                details: {
                    type: String
                },
                amount: {
                    type: String
                }

            }
        ],
        citations: {
            number: {
                type: Number
            }
        },
        development: [
            {
                title: {
                    type: String
                },
                organisation: {
                    type: String
                },
                dates: {
                    type: Date
                },
                days: {
                    type: Number
                }
            }
        ],
        soft_hard_dev: [{
            type: {
                type: String
            },
            model: {
                type: String
            },
            details: {
                type: String
            }
        }],
        activity_non_covered: [
            {
                Date: {
                    type: Date
                },
                Details: {
                    type: String
                }
            }
        ],
        total_marks_papers: {
            type: Number
        },
        total_marks_patent_book_mooc: {
            type: Number
        },
        citation_marks: {
            type: Number
        },

        totalMarks: {
            type: Number
        }

    },


    Dimension3: {
        IP1: {
            instituteLevelAssignments: [{
                role: {
                    type: String,
                    required: true,
                },
                tick: {
                    type: Boolean,
                    required: true,
                },
                marks: {
                    type: Number
                }
            }],
        },
        IP2: {
            otherInstituteLevelAssignments: [{
                role: {
                    type: String,
                },
                tick: {
                    type: Boolean,

                },
                marks: {
                    type: Number
                }
            }],
        },
        DP1: {
            departmentLevelAssignments: [{
                role: {
                    type: String,
                },
                tick: {
                    type: Boolean,
                },
                marks: {
                    type: Number
                }
            }],
        },
        OP1: {
            organised: [
                {
                    name: {
                        type: String
                    },
                    sponsered: {
                        type: String
                    },
                    fund: {
                        type: Number
                    },
                    Days: {
                        type: Number
                    }
                }
            ],
            total_marks: {
                type: Number
            }
        },
        Invited: {

            invitatedAt: [{
                industryName: {
                    type: String
                },
                Dates: {
                    type: Date
                },
                Details: {
                    type: String
                }
            }],
            total_marks: {
                type: String
            }

        },
        Partof: {
            committee: [
                {
                    name: {
                        type: String
                    },
                    Details: {
                        type: String
                    },
                    Organization: {
                        type: String
                    },
                    Date: {
                        type: Date
                    }
                }
            ],
            total_marks: {
                type: Number
            }
        },


        Article: {
            articleDetails: [{
                type: String
            }],
            totalMarks: {
                type: Number
            }
        },

        coGuide: {
            data: [{
                institutionName: {
                    type: String
                },
                details: {
                    type: String
                },
            }],
            totalMarks: {
                type: Number
            }
        },

        collaboration: {
            institutionDetails: {
                name: {
                    type: String
                },
                details: {
                    type: String
                }
            },
            totalMarks: {
                type: Number
            }
        },


        totalMarks: {
            type: Number
        }

    },



    Dimension4: {

        feedbackMarks: {
            A: {
                type: Number
            },
            B: {
                type: Number
            },
            C: {
                type: Number
            },
            D: {
                type: Number
            },
            E: {
                type: Number
            }
        },

        confidentialReport: {
            HODRemarks: {
                type: String
            },
            grandTotal: {
                type: Number
            },

            principalRemarks: {
                type: Number
            },
            perceptionMarks: {
                type: Number
            }
        }
    },


    finalGrandTotal: {
        dimension1: {
            totalMarks: {
                type: Number
            },
            multiplyingFactor: {
                type: Number
            },
            finalMarks: {
                type: Number
            }
        },
        dimension2: {
            totalMarks: {
                type: Number
            },
            multiplyingFactor: {
                type: Number
            },
            finalMarks: {
                type: Number
            }
        },
        dimension3: {
            totalMarks: {
                type: Number
            },
            multiplyingFactor: {
                type: Number
            },
            finalMarks: {
                type: Number
            }
        },
        dimension4: {
            totalMarks: {
                type: Number
            },
            multiplyingFactor: {
                type: Number
            },
            finalMarks: {
                type: Number
            }
        },

        GrandTotal: {
            type: Number
        }
    }




});

const Appraisal = mongoose.model('Appraisal', appraisalSchema);

module.exports = Appraisal;