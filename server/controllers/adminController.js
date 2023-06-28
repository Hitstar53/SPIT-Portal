const asyncHandler = require('express-async-handler')
const Student = require('../models/student');
exports.intitializeStudent = asyncHandler(async(req,res)=>{
    const email = req.body.email
    const uid = req.body.uid
    const name = req.body.name
    try {
        
        if(student){
            res.status(200).json(student)
        }else{
            const student = new Student({emailID:email})
            await student.save()
            res.status(200).json(student)
        }
    } catch (error) {
        console.error(error)
    }
})