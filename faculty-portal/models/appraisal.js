const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    yearofAssesment: {
        type: String
    },
    facultyName: {
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
                },
                class: {
                    type: String,
                },
                sem: {
                    type: String,
                },
                AP2MarksObtained: {
                    type: Number
                },
                AP3LecturesTarget: {
                    type: Number
                },
                AP3LectureConducted: {
                    type: Number
                },
                AP3PercentAchieved: {
                    type: Number,
                    // max: 100
                },
                AP4PercentFeedback: {
                    type: Number,
                    // max: 100
                },
                AP5AttendanceStudent: {
                    type: Number
                },
                AP8ActivityRemedial: {
                    type: String
                },
                AP9noteworthyDetails: {
                    type: String
                },
                paperSet: [{
                    paperSetForCourse: {
                        type: String
                    },
                    marks: {
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
                //max: 10
            },
            AP2Marks: {
                type: Number
            },
            AP3Average: {
                type: Number,
            },
            AP3Marks: {
                type: Number,
            },
            AP4Marks: {
                type: Number,
                //max: 30
            },
            AP5Average: {
                type: Number
            },
            AP5Marks: {
                type: Number,
                // max: 5
            },
            AP8Marks: {
                type: Number,
                // max: 5
            },
            AP9Marks: {
                type: Number,
                // max: 10
            },
            AP10Marks: {
                type: Number,
                // max: 10
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
            totalMarks: {
                type: Number,
                // max: 30
            }
        },
        // },
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
                        type: Number
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
                        type: Number
                    }

                }
            ],
        },


        RP4: {
            number: {
                type: Number
            },
            Marks: {
                type: Number
                // max: 25
            }
        },

        RP5: {
            selfDevelopment: [
                {
                    title: {
                        type: String
                    },
                    organization: {
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
            softHardDev: [{
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
            marks: {
                type: Number,
                //max: 10
            }
        },

        RP7: {
            activityNotCovered: [
                {
                    date: {
                        type: String
                    },
                    details: {
                        type: String
                    }
                }
            ],
            marks: {
                type: Number,
                //max: 10
            }
        },

        totalMarks: {
            type: Number
        }
    },
    Dimension3: {
        IP1: [{
            role: {
                type: String,
                // required: true,
            },
            tick: {
                type: Boolean,
                // required: true,
            },
            marks: {
                type: Number,
                default: 20
            }
        }],
        IP2: [{
            role: {
                type: String,
            },
            tick: {
                type: Boolean,

            },
            marks: {
                type: Number,
                default: 10
            }
        }],
        DP1: [{
            role: {
                type: String,
            },
            tick: {
                type: Boolean,
            },
            marks: {
                type: Number,
                default: 10
            }
        }],
        totalIP1IP2DP1Marks: {
            type: Number
        },
        OP1: {
            organized: [
                {
                    name: {
                        type: String
                    },
                    sponsored: {
                        type: String
                    },
                    fund: {
                        type: Number
                    },
                    days: {
                        type: Number
                    }
                }
            ],
            totalMarks: {
                type: Number
            }
        },
        Invited: {
            invitedAt: [{
                industryName: {
                    type: String
                },
                dates: {
                    type: String
                },
                details: {
                    type: String
                }
            }],
            totalMarks: {
                type: Number
            }

        },

        Partof: {
            committee: [
                {
                    name: {
                        type: String
                    },
                    details: {
                        type: String
                    },
                    organization: {
                        type: String
                    },
                    date: {
                        type: String
                    }
                }
            ],
            totalMarks: {
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
            institutionDetails:[{
                name: {
                    type: String
                },
                details: {
                    type: String
                }
            }],
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

            principalRemarks: {
                type: Number
            },
            perceptionMarks: {
                type: Number
            },
            // grandTotal: {
            //     type: Number
            // },

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