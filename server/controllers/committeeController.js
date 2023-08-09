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
        const comAnnouncements = req.body.comAnnouncements;
        try {
            const committee = new Committee({name:name,description:description,facultyMentor:facultyMentor,members:members,logo:logo,comAnnouncements:comAnnouncements});
            await committee.save()
            res.status(200).json('Committee Added Succesfully')
        } catch (error) {
            res.status(400).json(error)
        }
})

exports.getAllCommittees = asyncHandler(async(req,res) =>{
    try {
        const allCommittees = await Committee.find()
        res.status(200).json(allCommittees)    
    } catch (error) {
                res.status(400).json(error)

    }
})

exports.deleteCommittee = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id;
        await Committee.findOneAndDelete({'_id':id})
        res.status(200).json('deleted Succesfully')
    } catch (error) {
                res.status(400).json(error)

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
                res.status(400).json(error)

    }
})

exports.getCommitteeNames = asyncHandler(async(req,res) =>{
    try {
        const committeeNames = await Committee.find().select('name facultyMentor -_id')
        res.status(200).json(committeeNames)
    } catch (error) {
                res.status(400).json(error)

    }
})
exports.getCommitteeDetails = asyncHandler(async(req,res) =>{
    const comname = req.body.comname
    try {
        const committeeNames = await Committee.findOne({name:comname}).select('members -_id')
        res.status(200).json(committeeNames)
    } catch (error) {
                res.status(400).json(error)

    }
})
exports.setCommitteeDetails = asyncHandler(async(req,res) =>{
    const comname = req.body.comname
    const name = req.body.name
    const position = req.body.position
    try {
        const committee = await Committee.findOne({name:comname})
        committee.members.push({name:name,position:position})
        await committee.save()
        res.status(200).json("committee member added successfully")
    } catch (error) {
                res.status(400).json(error)

    }
})
exports.deleteCommitteeDetails = asyncHandler(async(req,res) =>{
    const comname = req.body.comname
    const members = req.body.members
    try {
        const committee = await Committee.findOneAndUpdate({name:comname},{$set:{members:members}})
        res.status(200).json("committee member deleted successfully")
    } catch (error) {
                res.status(400).json(error)

    }
})

exports.getRole = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try {
        const role = await Student.findOne({emailID:email}).select('role -_id')
        res.status(200).json(role)
    } catch (error) {  
                res.status(400).json(error)

    }   
})

exports.makeNewCP = asyncHandler(async(req,res)=>{
    const currentCPEmail = req.body.cemail
    const newCPEmail = req.body.nemail
    const comname = req.body.comname
    try {
        await Student.findOneAndUpdate({emailID:currentCPEmail},{$set:{role:'-'}})
        await Student.findOneAndUpdate({emailID:newCPEmail},{$set:{role:comname}})
        res.status(200).json("New CP made successfully")
    } catch (error) {  
                res.status(400).json(error)

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
//                 res.status(400).json(error)

//     }
// })