const asyncHandler = require('express-async-handler')
const Student = require('../models/student');
exports.setInternship = asyncHandler(async(req,res) =>{
    const organization = req.body.organization
    const position = req.body.position
    const duration = req.body.duration
    const mode = req.body.mode
    const description = req.body.description
    const email = req.body.email
    try {
        const profile = await Student.findOne({emailID:email})
        profile.internship.unshift({organization:organization,position:position,duration:duration,mode:mode,description:description})
        await profile.save()
        res.status(200).json("Internship added succesfully")
    }catch (error) {
        console.error(error)
    }
})