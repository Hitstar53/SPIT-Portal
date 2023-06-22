const asyncHandler = require('express-async-handler');
const Appraisal = require('../models/appraisal.js')
const { error } = require("console");

const setAppraisal = asyncHandler(async (req, res) => {
    console.log("Inside setAppraisalDim1");
    try {
        const { Dimension1, Dimension2, Dimension3, Dimension4 } = req.body;
        var total = 0;
        var avgAP1Marks = 0;
        var avgAP2Marks = 0;

        if (Dimension1.info.courses.length > 2) {
            avgAP1Marks = 10;
        }
        else {
            avgAP1Marks = Dimension1.info.courses.length * 4;
        }
        // ----------------------------------------------------------------------------------------

        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            total = total + Dimension1.info.courses[i].AP2MarksObtained
        }
        avgAP2Marks = total / Dimension1.info.courses.length;

        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            var averagePercent = (Dimension1.info.courses[i].LectureConducted / Dimension1.info.courses[i].LecturesTarget) * 100;
            Dimension1.info.courses[i].AP3PercentAchieved = averagePercent;

        }
        var totalTarget = 0;
        var averagePercent = 0
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            totalTarget = totalTarget + Dimension1.info.courses[i].AP3PercentAchieved
        }
        averagePercent = totalTarget / Dimension1.info.courses.length;

        if (averagePercent < 80) {
            //To be discussed
        }
        if (averagePercent >= 80 && averagePercent < 90) {
            Dimension1.info.AP3Marks = 3
        }
        if (averagePercent >= 90 && averagePercent < 95) {
            Dimension1.info.AP3Marks = 4
        }
        if (averagePercent >= 95 && averagePercent <= 100) {
            Dimension1.info.AP3Marks = 5
        }
        // -----------------------------------------------------------------------------------

        var totalpercentAP4 = 0;
        var averagePercentAP4 = 0
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            totalpercentAP4 = totalpercentAP4 + Dimension1.info.courses[i].AP4PercentFeedback
        }
        averagePercentAP4 = totalpercentAP4 / Dimension1.info.courses.length;

        if (averagePercentAP4 > 30) {
            averagePercentAP4 = 30
        }

         var totalpercentAP5 = 0;
         var averagePercentAP4 = 0;
         for (var i = 0; i < Dimension1.info.courses.length; i++) {
           totalpercentAP4 =
             totalpercentAP4 + Dimension1.info.courses[i].AP4PercentFeedback;
         }
         averagePercentAP4 = totalpercentAP4 / Dimension1.info.courses.length;

         if (averagePercentAP4 > 30) {
           averagePercentAP4 = 30;
         }

        Dimension1.info.AP1Marks = avgAP1Marks
        Dimension1.info.AP2Average = avgAP2Marks
        Dimension1.info.AP3Average = averagePercent;
        Dimension1.info.AP4Marks = averagePercentAP4;

        const newAppraisal = new Appraisal({
            Dimension1,
            Dimension2,
            Dimension3,
            Dimension4
        });
        const savedAppraisal = await newAppraisal.save();
        res.status(200).json(savedAppraisal);


    } catch (error) {
        console.error('Error saving appraisal:', error);
        throw error;
    }
})

module.exports = {
    setAppraisal
}