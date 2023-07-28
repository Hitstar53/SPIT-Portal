const asyncHandler = require('express-async-handler');
const Faculty = require('../models/faculty');
const Student = require('../models/student');
const Placement = require('../models/placement')
exports.getFaculty = asyncHandler(async (req, res) => {
    emailID = req.body.email;
    try {
        const faculty = await Faculty.findOne({emailID: emailID}).select('name announcements -_id');
        res.status(200).json(faculty);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

exports.downloadStudent = asyncHandler( async(req,res) =>{
    const uid = req.body.uid
    try{
        const student = await Student.findOne({uid:uid})
        const placement = await Placement.findOne({emailID:student.emailID})

        res.status(200).json({...student._doc,placement:placement})
    }
    catch(error){
        console.error(error)
    }

} )