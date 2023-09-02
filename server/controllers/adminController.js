const asyncHandler = require('express-async-handler')
const Student = require('../models/student');
const Placement = require('../models/placement')
const Photo = require('../models/photo')
const Faculty = require('../models/faculty')
const User = require('../models/users')


exports.intitializeFaculty = asyncHandler(async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    try {
        const faculty = new Faculty({
            emailID: email, name: name, announcements: [],isAdmin:false
        })
        await faculty.save();
        const user = new User({
            emailID: email, role: 'Faculty'
        })
        await user.save();
        res.status(200).json({ message: 'Faculty Created' }
        )
    }
    catch (error) {
        res.status(400).json(error)
    }
})


exports.intitializeStudent = asyncHandler(async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    try {
        const placement = await new Placement({
            emailID: email, companyName: '-', contactNo: '-', address: '-', role: '-', description: '-', doj: new Date(), ctc: '-',
        })
        await placement.save();
        const photo = await new Photo({
            photoURI: '', emailID: email
        })
        await photo.save();
        const student = await new Student({
            emailID: email, uid: 0, name: name, phone: '-', address: '-', dob: new Date(), religion: '-', blood: '-', gender: '-', linkedin: '-', github: '-', onGoingSemester: 1, cgpa: 0,role:"-", batch: '-', announcements: [],
            mname: '-', mphone: '-', memail: '-', fname: '-', fphone: '-', femail: '-', class: '-', exams: [], educationalInfo: [{ type: "Current Degree", insName: "-", year: "-" , degree: "-", branch: "-", division: "-", semester: 0,batch:'-' , passingYear: 0, score: "0" }, { type: "Junior College", insName: "-", degree: "-", passingYear: 0, score: "0" }, { type: "School", insName: "-", degree: "-", passingYear: 0, score: "0" }], semester: [{semesterNumber:1,courses:[],sgpa:0,status:"Ongoing"},{semesterNumber:2,courses:[],sgpa:0,status:"Not Started"},{semesterNumber:3,courses:[],sgpa:0,status:"Not Started"},{semesterNumber:4,courses:[],sgpa:0,status:"Not Started"},{semesterNumber:5,courses:[],sgpa:0,status:"Not Started"},{semesterNumber:6,courses:[],sgpa:0,status:"Not Started"},{semesterNumber:7,courses:[],sgpa:0,status:"Not Started"},{semesterNumber:8,courses:[],sgpa:0,status:"Not Started"},], committee: [], participation: [], volunteerWork: [],
            skills: [], projects: [], research: [], internship: [],
        })
        await student.save();
        const user = await new User({
            emailID: email, role: 'Student'
        })
        await user.save();
        res.status(200).json({ message: 'Student Created' })
    }

    catch (error) {
        res.status(400).json(error)
    }
})


exports.makeAdmin = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try{
        const faculty = await Faculty.findOne({emailID:email})
        if(faculty){
            faculty.isAdmin = true
            await faculty.save()
            res.status(200).json({message:"Admin added succesfully"})
        }
        else{
            res.status(404).json({message:"Faculty does not exist"})
        }
    }catch(error){
        res.status(404).json({message:"Something went wrong. Please try again later."})        
    }
})