const asyncHandler = require('express-async-handler')
const Event = require('../models/Event');
exports.setEvent = asyncHandler(async(req,res) =>{
        const endDate = new Date(req.body.endDate)
        const name = req.body.name;
        const organizedBy = req.body.organizedBy;
        const description = req.body.description;
        try {
            const event = new Event({endDate:endDate,name:name,organizedBy:organizedBy,description:description,postDate:postDate})
            await event.save()
            res.status(200).json('Event Added Succesfully')
        } catch (error) {
            console.error(error)
        }
})

exports.getEvent = asyncHandler(async(req,res) =>{
    try {
        const allEvents = await Event.find()
        res.status(200).json(allEvents)    
    } catch (error) {
        console.error(error)
    }
})

exports.deleteEvent = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id;
        await Event.findOneAndDelete({'_id':id})
        res.status(200).json('deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.setCommitteeEvents = asyncHandler(async(req,res) => {
        const name = req.body.name;
        const description = req.body.description;
        const endDate = new Date(req.body.endDate);
        const organizedBy = req.body.comname;
        try{
            const event = new Event({endDate:endDate,name:name,organizedBy:organizedBy,description:description})
            await event.save()
            res.status(200).json('Committee Event Saved Successfully');
        }
        catch(error){
            console.error(error)
        }
})

exports.getCommitteeEvents = asyncHandler(async(req,res) => {
        const comname = req.body.comname;
        try{
            const event = await Event.find({organizedBy : comname})
            res.status(200).json(event)
        }
        catch(error){
            console.error(error)
        }
})