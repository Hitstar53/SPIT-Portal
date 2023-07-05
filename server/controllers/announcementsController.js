const asyncHandler = require('express-async-handler')
const Announcement = require('../models/announcements')

exports.setAnnouncement = asyncHandler(async(req,res) =>{
    const sender = req.body.sender;
    const description = req.body.description;
    const senderPhoto = req.body.senderPhoto;
    const type = req.body.type;
    const postDate = req.body.postDate;

    try {
        const announcement = new Announcement({sender:sender,senderPhoto:senderPhoto,type:type,description:description,postDate:postDate})
        await announcement.save()
        res.status(200).json('Announcement Added Succesfully')
    } catch (error) {
        console.error(error)
    }
})




