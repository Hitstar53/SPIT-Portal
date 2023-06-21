const asyncHandler = require('express-async-handler');
const Appraisal = require('../models/appraisal.js')
const { error } = require("console");

const setAppraisal = asyncHandler(async (req, res) => {
    console.log("Inside setAppraisalDim1");
    try {
        const { Dimension1, Dimension2, Dimension3, Dimension4 } = req.body;
        var total = 0;
        var avgAP2Marks = 0;
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            total = total + Dimension1.info.courses[i].AP2MarksObtained
        }
        avgAP2Marks = total / Dimension1.info.courses.length;

        var avgAP1Marks = 0;
        if (Dimension1.info.courses.length > 2) {
            avgAP1Marks = 10;
        }
        else {
            avgAP1Marks = Dimension1.info.courses.length * 4;
        }

        Dimension1.info.AP2Average = avgAP2Marks
        Dimension1.info.AP1Marks = avgAP1Marks

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