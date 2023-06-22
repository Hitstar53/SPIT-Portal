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

