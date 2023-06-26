const asyncHandler = require('express-async-handler')
const Event = require('../models/Event');
const { ObjectId } = require('mongodb');
exports.setEvent = asyncHandler(async(req,res) =>{
        const date = req.body.date;
        const name = req.body.name;
        const organizedBy = req.body.organizedBy;
        const description = req.body.description;

        try {
            const event = new Event({date:date,name:name,organizedBy:organizedBy,description:description})
            await event.save()
            console.log('hello')
            res.status(200).json('Event Added Succesfully')
        } catch (error) {
            console.error(error)
        }
})

exports.getEvent = asyncHandler(async(req,res) =>{
    console.log('hello')
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