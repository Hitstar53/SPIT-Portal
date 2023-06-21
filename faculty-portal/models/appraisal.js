const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    teacherName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    },
    YearofAssesment: {
        type: String
    },
    department: {
        type: String,

    },
    designation: {
        type: String,

    },
    Dimension1: {
        info:
        {
            courses: [{
                name: {
                    type: String,
                    required: true
                },
                class: {
                    type: String,
                    required: true
                },
                Sem: {
                    type: String,
                    required: true
                },
                AP2MarksObtained: {
                    type: Number
                },
                LecturesTarget: {
                    type: Number
                },
                LectureConducted: {
                    type: Number
                },
                PercentAcheived: {
                    type: Number,
                    max: 100
                },
                Percentagefeedback: {
                    type: Number,
                    max: 100
                },
                AttendanceStudent: {
                    type: Number
                },
                Actvityremedial: {
                    type: String
                },
                NotworthyDetails: {
                    type: String
                },
                PaperSet: [{
                    papersetforCourse: {
                        type: String
                    },
                    Marks: {
                        type: Number
                    }
                }]
            }
            ],

            AP1Marks: {
                type: Number,
                max: 10
            },
            AP2Average: {
                type: Number,
                max: 10
            },
            AP3Average: {
                type: Number,
                max: 5
            },
            AP4Marks: {
                type: Number,
                max: 30
            },
            AP5Marks: {
                type: Number,
                max: 5
            },

            AP8Marks: {
                type: Number,
                max: 5
            },
            AP9Marks: {
                type: Number,
                max: 10
            },
            AP10Marks: {
                type: Number,
                max: 10
            },
        },



        AP6: {
            menteeFeedback: [{
                type: Number //  changes from string quantified and filled here
            }],
            averageMarks: {
                type: Number
            }
        },
        AP7: {
            guestLectureData: [{
                date: {
                    type: String
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
        RP1: {
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
            Total_marks: {
                type: Number,
                max: 30
            }   
        },
        RP2: {
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
            total_marks: {
                type: Number,
                max: 30
            },


        },
        RP3: {
            sponsored: [
                {
                    date: {
                        type: String
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
        },


        RP4citations: {
            number: {
                type: Number
            },
            Marks: {
                type: Number,
                max: 25
            }
        },



        RP5: {
            development: [
                {
                    title: {
                        type: String
                    },
                    organisation: {
                        type: String
                    },
                    dates: {
                        type: String
                    },
                    days: {
                        type: Number
                    }
                }
            ],
        },

        RP6: {
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
            Marks: {
                type: Number,
                max: 10
            }
        },

        RP7: {
            activity_non_covered: [
                {
                    Date: {
                        type: String 
                    },
                    Details: {
                        type: String
                    }
                }
            ],
            marks: {
                type: Number,
                max: 10
            }
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
                    type: String
                },
                tick: {
                    type: Boolean
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
                        type: String
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