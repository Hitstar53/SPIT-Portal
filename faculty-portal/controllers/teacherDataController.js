const asyncHandler = require('express-async-handler');
const Faculty = require('../models/faculty.js')
const { error } = require("console");

const getFaculty = asyncHandler(async (req, res) => {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
    console.log("Inside getFaculty");
})


const setFaculty = asyncHandler(async (req, res) => {

})

const updateFaculty = asyncHandler(async (req, res) => {

})

const deleteFaculty = asyncHandler(async (req, res) => {

})

module.exports = {
    getFaculty,
    setFaculty,
    updateFaculty,
    deleteFaculty,
}