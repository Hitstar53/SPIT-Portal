const asyncHandler = require('express-async-handler');
const Apprisal = require('../models/appraisal.js')
const { error } = require("console");

const getAppraisal = asyncHandler(async (req, res) => {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
    console.log("Inside getFaculty");
})


const setAppraisal = asyncHandler(async (req, res) => {

})

const updateAppraisal = asyncHandler(async (req, res) => {

})

const deleteAppraisal = asyncHandler(async (req, res) => {

})

module.exports = {
    getAppraisal,
    setAppraisal,
    updateAppraisal,
    deleteAppraisal,
}