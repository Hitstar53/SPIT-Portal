const asyncHandler = require('express-async-handler');
const Faculty = require('../models/faculty.js')
const { error } = require("console");

const getFaculty = asyncHandler(async (req, res) => {
    console.log("Inside getFaculty");
    const faculties = await Faculty.findById(req.params.id);
    res.status(200).json(faculties);
})

const setFaculty = asyncHandler(async (req, res) => {

})

const updateFaculty = asyncHandler(async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try{
        var facultyDetails = await Faculty.updateOne({ email: email }, req.body);
        console.log(facultyDetails);
        res.status(200).send(facultyDetails);
    }
    catch(err){
        console.log(err);
        res.status(504).send(err);
    }
})

const deleteFaculty = asyncHandler(async (req, res) => {

})

const loginFaculty = async (req, res) => {
    const { email } = req.body;
    const det = await Faculty.findOne({ email: email })
    if (det) {
        res.status(200).send(det)
    } else {
        res.status(404).send("NO data found")
    }
}

module.exports = {
    getFaculty,
    setFaculty,
    updateFaculty,
    deleteFaculty,
    loginFaculty,
}

