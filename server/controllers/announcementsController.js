const asyncHandler = require('express-async-handler')
const Announcement = require('../models/announcements')
const Student = require('../models/student')
const Committee = require('../models/commitee')
const mongoose = require('mongoose')
const Faculty = require('../models/faculty')
const { format, addDays } = require('date-fns');
const dayjs = require('dayjs')

exports.setAnnouncementsAllStudents = asyncHandler(async (req, res) => { 
    const title = req.body.title
    const description = req.body.description
    const sender = req.body.email
    const senderPhoto = req.body.senderPhoto || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    const type = req.body.type
    const postDate = new Date()
    const endDate = new Date(req.body.endDate)

    try {
        // Student.collection.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
        // const date = new Date(endDatyy')e)
        // const formattedDate = format(date, 'MM-dd-yy

        const senderName = await Faculty.findOne({emailID:sender}).select('name -_id')
        const announcement = await Announcement.create({
            title:title,
            description:description,
            sender:senderName.name,
            senderPhoto:senderPhoto,
            type:type,
            postDate:postDate,
            endDate: endDate,
            sendTo:"All"
        }) 
        
        await Student.updateMany({},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
        await Faculty.updateOne({emailID:sender},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
        
        res.status(200).json(announcement)
    }  catch (error) {
        console.error(error)
    }
})


exports.setAnnouncementsGroupStudents = asyncHandler(async (req, res) => { 
    const year = req.body.year
    const branch = req.body.branch
    const division = req.body.division
    const batch = req.body.batch
    const title = req.body.title
    const description = req.body.description
    const sender = req.body.email
    const senderPhoto = req.body.senderPhoto || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    const type = req.body.type
    const postDate = new Date()
    const endDate = new Date(req.body.endDate)
    const senderName = await Faculty.findOne({emailID:sender}).select('name -_id')
    if(batch)
    {
        try {
            const announcement = await Announcement.create({
                title:title,
                description:description,
                sender:senderName.name,
                senderPhoto:senderPhoto,
                type:type,
                postDate:postDate,
                endDate:endDate,
                sendTo:`${year} ${branch} ${division} Batch: ${batch}`
            })
            await Student.updateMany({"educationalInfo.0.year":year,"educationalInfo.0.branch":branch,"educationalInfo.0.division":division, "educationalInfo.0.batch": batch},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
            await Faculty.updateOne({emailID:sender},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
            
            res.status(200).json(announcement)
        }  catch (error) {
            console.error(error)
        }
        
    }
    
    else{
        try {
            const announcement = await Announcement.create({
                title:title,
                description:description,
                sender:senderName.name,
                senderPhoto:senderPhoto,
                type:type,
                postDate:postDate,
                endDate:endDate,
                sendTo:`${year} ${branch} ${division} ${batch}`
            })
            await Student.updateMany({"educationalInfo.0.year":year,"educationalInfo.0.branch":branch,"educationalInfo.0.division":division},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
            await Faculty.updateOne({emailID:sender},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
            
            res.status(200).json(announcement)
        }  catch (error) {
            console.error(error)
        }
    }
    
})



exports.setAnnouncementsSpecificStudents = asyncHandler(async (req, res) => { 
    const title = req.body.title
    const description = req.body.description
    const sender = req.body.email
    const senderPhoto = req.body.senderPhoto || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" 
    const type = req.body.type
    const postDate = new Date()
    const students = req.body.students
    const endDate = new Date(req.body.endDate)
    const senderName = await Faculty.findOne({emailID:sender}).select('name -_id')
    try {
        const announcement = await Announcement.create({
            title:title,
            description:description,
            sender:senderName.name,
            senderPhoto:senderPhoto,
            type:type,
            postDate:postDate,
            endDate: endDate,
            sendTo:"Specific Students"
        })
        await Student.updateMany({uid:{$in:students}},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
        await Faculty.updateOne({emailID:sender},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})

        res.status(200).json(announcement)
    }  catch (error) {
        console.error(error)
    }
})

exports.getStudentAnnouncements = asyncHandler(async (req, res) => {
    const email = req.body.email
    try {   
        const student = await Student.findOne({emailID:email}).populate({
            path: 'announcements',
            options: { sort: { postDate: -1 } }
        })
        res.status(200).json(student.announcements)
    }
    catch (error) {
        console.error(error)
    }
})

exports.getFacultyAnnouncements = asyncHandler(async (req, res) => {
    const email = req.body.email
    try {   
        const faculty = await Faculty.findOne({emailID:email}).select('announcements upcomingExams -_id').populate({
            path: 'announcements',
            options: { sort: { postDate: -1 } }
        })
        res.status(200).json(faculty)
    }
    catch (error) {
        console.error(error)
    }
})

exports.setCommitteeAnnouncements = asyncHandler(async(req,res) => {    const title = req.body.title
    const description = req.body.description
    const type = req.body.type
    const sender = req.body.comname
    const senderPhoto = req.body.senderPhoto || "https://www.pngwing.com/en/free-png-zxlck"
    const postDate = new Date()
    const endDate = new Date(req.body.endDate)
    const sendTo = req.body.sendTo
    try{
        const announcement = await Announcement.create({
            title:title,
            description:description,
            sender:sender,
            senderPhoto:senderPhoto,
            type:type,
            postDate:postDate,
            endDate: endDate,
            sendTo:sendTo
        })
        await Student.updateMany({},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
        await Committee.updateOne({name:sender},{$push:{comAnnouncements:new mongoose.Types.ObjectId(announcement._id)}})
        res.status(200).json("Announcement Set Successfully")
    }
    catch(error)
    {
        console.error(error)
    }
})

exports.getCommitteeAnnouncements = asyncHandler(async(req,res) => {
    const comname = req.body.comname;
    try{
        const committee = await Committee.findOne({name : comname}).select('name comAnnouncements -_id').populate({
            path: 'comAnnouncements',
            options: { sort: { postDate: -1 } }
        })
        res.status(200).json(committee.comAnnouncements)
    }
    catch(error){
        console.error(error)
    }

})