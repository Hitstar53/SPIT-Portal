const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    uid:{ type : Number, required:true},
    name:{ type : String, required:true},
    emailID:{ type : String, required:true},
    phoneNo:{ type : String, required:true},
    address:{ type : String, required:true},
    dob:{ type:String, required:true},
    religion:{ type : String, required:true,default:"Not disclosed"},
    bloodGroup:{ type : String, required:true},
    gender:{ type : String, required:true,default:"Not disclosed"},
    linkedin:{type: String, required:true,default:"None"},
    github:{type: String, required:true,default:"None"},
    onGoingSemester:{type:Number,required:true},
    cgpa:{type:Number,required:true},
    batch:{type:String,requried:true},
    announcements:[
        {
            type:mongoose.Schema.Types.ObjectId
        },
    ],
    parent:[
        {
            role:{
                type:String
            },
            name:{
                type:String
            },
            phoneNo:{
                type:String
            },
            emailID:{
                type:String
            }
        },
    ],
    exams:[
        {
            date:{ type : Date, required:true},
            syllabus:{ type : String, required:true},
            type:{ type : String, required:true},
            courseName:{ type : String, required:true},
        }
    ],
    educationalInfo:[
        {
            type:{
                type:String,
                required:true
            },
            insName:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            branch:{
                type:String,
            },
            division:{
                type:String,
            }
            ,
            semester:{
                type:String,
            },
            admissionYear:{
                type:Number,
                required:true
            },
            passingYear:{
                type:Number,
                required:true
            },
            score:{
                type:Number,
                required:true
            }
        }
    ],
    semester:[
        {
            semesterNumber:{ type : Number, required:true},
            courses:[
                {
                    courseInfo:{type:mongoose.Schema.Types.ObjectId,required:true},
                    exams:[
                        {
                            type:{type:String,required:true},
                            date:{type:Date,required:true},
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
    committees:[
        {
            committeeDetails:{ type: mongoose.Schema.Types.ObjectId,required:true },
            tenure:{ type:String,required:true },
            position:{ type : String, required:true},
        },
    ],
    participation:[
        {
            eventName:{ type : String, required:true},
            date:{ type : Date, required:true},
            organization:{ type : String, required:true},
            description:{ type : String, required:true},
        }
    ],
    volunteerWork:[
        {
            eventName:{ type : String, required:true},
            date:{ type : Date, required:true},
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
            mentor:{ type : String, required:true},
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
            team:[
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
            description:{ type : String, required:true},
        },
    ],
    placement:
        {
            type:mongoose.Schema.Types.ObjectId
        }
    
},
{
    collection: 'student'
})

module.exports = mongoose.model("student",studentSchema)