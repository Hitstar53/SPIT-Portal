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
        const faculty = await new Faculty({
            emailID: email, name: name, announcements: []
        })
        await faculty.save();
        const user = await new User({
            emailID: email, role: 'Faculty'
        })
        await user.save();
        res.status(200).json({ message: 'Faculty Created' }
        )
    }
    catch (error) {
        console.error(error)
    }
})


exports.intitializeStudent = asyncHandler(async (req, res) => {
    const email = req.body.email
    const uid = req.body.uid
    const name = req.body.name
    try {
        const placement = await new Placement({
            emailID: email, companyName: '-', contactNo: '-', address: '-', role: '-', description: '-', doj: '-/-/-', ctc: '-',
        })
        await placement.save();
        const photo = await new Photo({
            photoURI: '', emailID: email
        })
        await photo.save();
        const student = await new Student({
            emailID: email, uid: uid, name: name, phone: '-', address: '-', dob: '-/-/-', religion: '-', blood: '-', gender: '-', linkedin: '-', github: '-', onGoingSemester: 1, cgpa: 0, batch: '-', announcements: [],
            mname: '-', mphone: '-', memail: '-', fname: '-', fphone: '-', femail: '-', class: '-', exams: [], educationalInfo: [{ type: "Current Degree", insName: "-", year: "-" , degree: "-", branch: "-", division: "-", semester: "-", admissionYear: 0, passingYear: 0, score: "0" }, { type: "Junior College", insName: "-", degree: "-", passingYear: 0, score: "0" }, { type: "School", insName: "-", degree: "-", passingYear: 0, score: "0" }], semester: [], committee: [], participation: [], volunteerWork: [],
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
        console.error(error)
    }
})