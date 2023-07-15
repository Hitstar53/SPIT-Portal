const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    uid:{ type : Number, required:true},
    name:{ type : String, required:true},
    class:{ type : String, required:true},
    emailID:{ type : String, required:true},
    phone:{ type : String, required:true},
    address:{ type : String, required:true},
    dob:{ type: Date, required:true},
    religion:{ type : String, required:true,default:"Not disclosed"},
    blood:{ type : String, required:true},
    gender:{ type : String, required:true,default:"Not disclosed"},
    linkedin:{type: String, required:true,default:"None"},
    github:{type: String, required:true,default:"None"},
    onGoingSemester:{type:Number,required:true},
    cgpa:{type:Number,required:true},
    batch:{type:String,requried:true},
    announcements:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Announcements'
        },
    ],
    role:{
        type:String,
        
    },
    mname:{
        type:String
            },
    mphone:{
        type:String
            },
    memail:{
        type:String
            },
    fname:{
        type:String
            },
    fphone:{
        type:String
            },
    femail:{
        type:String
            },
    fprofession:{
        type: String
    },
    mprofession:{
        type: String
    },
    exams:[
        {
            // name:{type: String, required:true},
            date:{ type : String, required:true},
            syllabus:{ type : String, required:true},
            type:{ type : String, required:true},
            courseName:{ type : String, required:true},
        }
    ],
    educationalInfo:[

    ],
    semester:[
        {
            semesterNumber:{ type : Number, required:true},
            courses:[
                {
                    courseName:{type:String,required:true},
                    exams:[
                        {
                            type:{type:String,required:true},
                            date:{type:String,required:true},
                            maxScore:{type:Number,required:true},
                            obtainedScore:{type:Number,required:true}
                        }
                    ]
                }
            ],
            sgpa:{ type : Number, required:true},
            status:{ type : String, required:true},
        },
    ],
    committee:[
        {
            committeeDetails:{ type: String,required:true,ref:'committee' },
            tenure:{ type:String,required:true },
            position:{ type : String, required:true},
        },
    ],
    participation:[
        {
            eventName:{ type : String, required:true},
            date:{ type : String, required:true},
            organization:{ type : String, required:true},
            description:{ type : String, required:true},
        }
    ],
    volunteerWork:[
        {
            eventName:{ type : String, required:true},
            date:{ type : String, required:true},
            organization:{ type : String, required:true},
            description:{ type : String, required:true},   
        }
    ],
    skills:[
        {
            type:String
        },
    ],
    projects:[
        {
            name:{ type : String, required:true},
            duration:{ type : String, required:true},
            domain:{ type : String, required:true},
            techStack:[
                {
                    type:String
                }
            ],
            team:[
                {
                    type:String
                }
            ],
            description:{ type : String, required:true},
        }
    ],
    research:[
        {
            name:{ type : String, required:true},
            duration:{ type : String, required:true},
            domain:{ type : String, required:true},
            techStack:[
                {
                    type:String
                }
            ],
            description:{ type : String, required:true},
            mentor:[{ type : String, required:true}],
        },
    ],
    internship:[
        {
            organization:{ type : String, required:true},
            position:{ type : String, required:true},
            duration:{ type : String, required:true},
            mode:{ type : String, required:true},
            financed:{ type : String, required:true},
            description:{ type : String, required:true},
        },
    ],
},
{
    collection: 'student'
})

module.exports = mongoose.model("student",studentSchema)