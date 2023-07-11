const asyncHandler = require('express-async-handler')
const Announcement = require('../models/announcements')
const Student = require('../models/student')
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
    const postDate = req.body.postDate
    const endDate = req.body.endDate

    try {
        // Student.collection.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
        // const date = new Date(endDate)
        // const formattedDate = format(date, 'MM-dd-yyyy')
        // console.log(date)
        // console.log(typeof(date))
        const announcement = await Announcement.create({
            title:title,
            description:description,
            sender:sender,
            senderPhoto:senderPhoto,
            type:type,
            postDate:postDate,
            endDate: endDate
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
    const postDate = req.body.postDate
    const endDate = req.body.endDate
    if(batch)
    {
        try {
            const announcement = await Announcement.create({
                title:title,
                description:description,
                sender:sender,
                senderPhoto:senderPhoto,
                type:type,
                postDate:postDate,
                endDate:endDate
            })
            await Student.updateMany({"educationalInfo.0.year":year,"educationalInfo.0.branch":branch,"educationalInfo.0.division":division, batch: batch},{$push:{announcements:new mongoose.Types.ObjectId(announcement._id)}})
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
                sender:sender,
                senderPhoto:senderPhoto,
                type:type,
                postDate:postDate,
                endDate:endDate
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
    const postDate = req.body.postDate
    const students = req.body.students
    const endDate = req.body.endDate
    try {
        const announcement = await Announcement.create({
            title:title,
            description:description,
            sender:sender,
            senderPhoto:senderPhoto,
            type:type,
            postDate:postDate,
            endDate: endDate
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
        const student = await Student.findOne({emailID:email}).populate('announcements')
        res.status(200).json(student.announcements)
    }
    catch (error) {
        console.error(error)
    }
})

exports.getFacultyAnnouncements = asyncHandler(async (req, res) => {
    const email = req.body.email
    try {   
        const faculty = await Faculty.findOne({emailID:email}).populate('announcements')
        res.status(200).json(faculty.announcements)
    }
    catch (error) {
        console.error(error)
    }
})

