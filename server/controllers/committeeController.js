const asyncHandler = require('express-async-handler')
const Committee = require('../models/commitee');
const Announcement = require('../models/announcements')
const Student = require('../models/student')
const mongoose = require('mongoose')
const Faculty = require('../models/faculty')
exports.setCommittee = asyncHandler(async(req,res) =>{
        const name = req.body.name;
        const description = req.body.description;
        const facultyMentor = req.body.facultyMentor;
        const members = req.body.members;
        const logo = req.body.logo;
        try {
            const committee = new Committee({name:name,description:description,facultyMentor:facultyMentor,members:members,logo:logo})
            await committee.save()
            res.status(200).json('Committee Added Succesfully')
        } catch (error) {
            console.error(error)
        }
})

exports.getAllCommittees = asyncHandler(async(req,res) =>{
    try {
        const allCommittees = await Committee.find()
        res.status(200).json(allCommittees)    
    } catch (error) {
        console.error(error)
    }
})

exports.deleteCommittee = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id;
        await Committee.findOneAndDelete({'_id':id})
        res.status(200).json('deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.updateCommittee = asyncHandler(async(req,res) => {
        const name = req.body.name;
        const description = req.body.description;
        const facultyMentor = req.body.facultyMentor;
        const members = req.body.members;
        const logo = req.body.logo;
    try {
        await Committee.findOneAndUpdate({name:name},{description:description,facultyMentor:facultyMentor,members:members,logo:logo},{upsert:true})
        res.status(200).json('committee updated successfully')
    } catch (error) {
        console.error(error)
    }
})

exports.getCommitteeNames = asyncHandler(async(req,res) =>{
    try {
        const committeeNames = await Committee.find().select('name facultyMentor -_id')
        res.status(200).json(committeeNames)
    } catch (error) {
        console.error(error)
    }
})

// exports.setCommitteeAnnouncements = asyncHandler(async(req,res) => {
//     const title = req.body.title
//     const description = req.body.description
//     const sender = req.body.email
//     const senderPhoto = req.body.senderPhoto || "https://www.pngwing.com/en/free-png-zxlck"
//     const type = req.body.type
//     const postDate = new Date()
//     const endDate = new Date(req.body.endDate)
//     try{
//         const announcement = await Announcement.create({
//             title:title,
//             description:description,
//             sender:sender,
//             senderPhoto:senderPhoto,
//             type:type,
//             postDate:postDate,
//             endDate: endDate
//         })
//         await Student.updateMany({},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
//         await Faculty.updateMany({},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
//         res.status(200).json("Announcement Set Successfully")
//     }
//     catch(error)
//     {
//         console.error(error)
//     }
// })