const asyncHandler = require('express-async-handler');
const Student = require('../models/student.js');
const Placement = require('../models/placement.js');

exports.getProfessionalInfo = asyncHandler(async(req,res) => {
    const organization = req.body.organization;
    const type = req.body.type;
    const ctc = req.body.ctc;
    try{ 
        if(type === "All")
        {
            // const placementEmails = await Placement.find({ companyName: organization }, 'emailID -_id');
            // const emailIDs = placementEmails.map(placement => placement.emailID);
            // const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id');
            // res.status(200).json(students)
        }
        else if(type === "Placement")
        {
            if(ctc && organization)
            {
                const placementEmails = await Placement.find({ ctc:ctc,companyName:organization}, 'emailID -_id');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id');
                res.status(200).json(students)
            }
            else if(organization){
                const placementEmails = await Placement.find({companyName:organization}, 'emailID ctc -_id');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id');
                res.status(200).json(students)
            }
            else if(ctc){
                const placementEmails = await Placement.find({ctc:ctc}, 'emailID -_id');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id');
                res.status(200).json(students)
            }
            else{
                const placementEmails = await Placement.find({}, 'emailID -_id');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id');
                res.status(200).json(students)
            }
        }
        else{
            if(organization){
                const students = await Student.find({internship:{$elemMatch:{organization:organization}}},'emailID name uid -_id')
                res.status(200).json(students)
            }
            else{
                const students = await Student.find({'internship.0':{$exists:true}},'emailID name uid -_id')
                res.status(200).json(students)
            }
        }
    }
    catch(error){
        console.error(error)
    }
})