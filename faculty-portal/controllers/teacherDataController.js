const asyncHandler = require('express-async-handler');
const Faculty = require('../models/faculty.js')
const { error } = require("console");

exports.getFaculty = asyncHandler(async (req, res) => {
    console.log("Inside getFaculty");
    const faculties = await Faculty.findById(req.params.id);
    res.status(200).json(faculties);
})

exports.setFaculty = asyncHandler(async (req, res) => {

})

exports.updateFaculty = asyncHandler(async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
        var facultyDetails = await Faculty.updateOne({ email: email }, req.body);
        var newDet = await Faculty.findOne({ email: email });
        console.log(newDet);
        res.status(200).json(newDet);
    }
    catch (err) {
        console.log(err);
        res.status(504).send(err);
    }
})

exports.retrieveFacultyCourses = asyncHandler(async (req, res) => {
    const email = req.body.email;
    try {
        const det = await Faculty.findOne({ email: email });
        det.courses = det.history.pop();
        const newDet = await Faculty.updateOne({ email: email }, det);
        res.status(200).send(newDet);
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }
})

exports.deleteCourses = asyncHandler(async (req, res) => {
    const email = req.body.email;
    try {
        const faculty = await Faculty.findOne({ email });
        faculty.history.push(faculty.courses);
        faculty.courses = [];

        const det = await Faculty.updateOne({ email: email },
            faculty
        );
        res.status(200).send("Removed details");
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }

})

exports.loginFaculty = async (req, res) => {
    const { email } = req.body;
    const det = await Faculty.findOne({ email: email })
    if (det) {
        res.status(200).send(det)
    } else {
        res.status(404).send("NO data found")
    }
}

exports.getEvent = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const det = await Faculty.findOne({ email: email })
        if (!det) {
            return res.status(404).send('User not found');
        }
        const events = det.events

        console.log(events);
        res.status(200).send(events);
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }
})  

exports.addEvent = asyncHandler(async (req, res) => {
    const { email, events } = req.body;
    console.log(req.body)
    try {
        const det = await Faculty.updateOne({ email: email }, {
            $push: {
                events: events
            }
        })
        console.log(det);
        res.status(200).send(det);
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }
})  
