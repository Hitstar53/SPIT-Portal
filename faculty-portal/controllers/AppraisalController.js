const asyncHandler = require('express-async-handler');
const Apprisal = require('../models/appraisal.js')
const { error } = require("console");

const getAppraisal = asyncHandler(async (req, res) => {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
    console.log("Inside getFaculty");
})


const setAppraisalDim1 = asyncHandler(async (req, res) => {
    
})
const setAppraisalDim2 = asyncHandler(async (req, res) => {

})
const setAppraisalDim3 = asyncHandler(async (req, res) => {

})

const setAppraisalDim4 = asyncHandler(async (req, res) => {

})


module.exports = {
 setAppraisalDim1,
 setAppraisalDim2,
 setAppraisalDim3,
 setAppraisalDim4
}