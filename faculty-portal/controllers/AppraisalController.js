const asyncHandler = require('express-async-handler');
const Appraisal = require('../models/appraisal.js')
const { error } = require("console");

const setAppraisal = asyncHandler(async (req, res) => {
    console.log("Inside setAppraisalDim1");
    try {
        const { Dimension1, Dimension2, Dimension3, Dimension4 } = req.body;
        // const { RP1, totalMarks } = req.body;
        // const { totalMarks } = req.body;
        const newAppraisal = new Appraisal({
            Dimension1,
            Dimension2,
            Dimension3,
            Dimension4
        });
        const savedAppraisal = await newAppraisal.save();
        res.status(200).json(savedAppraisal);


    } catch (error) {
        console.error('Error saving course:', error);
        throw error;
    }
})

module.exports = {
    setAppraisal
}