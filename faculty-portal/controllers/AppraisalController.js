const asyncHandler = require('express-async-handler');
const Apprisal = require('../models/appraisal.js')
const { error } = require("console");

const getAppraisal = asyncHandler(async (req, res) => {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
    console.log("Inside getFaculty");
})


const setApprisal = asyncHandler(async (req, res) => {

})

const updateApprisal = asyncHandler(async (req, res) => {

})

const deleteApprisal = asyncHandler(async (req, res) => {

})

module.exports = {
    getApprisal,
    setApprisal,
    updateApprisal,
    deleteApprisal,
}