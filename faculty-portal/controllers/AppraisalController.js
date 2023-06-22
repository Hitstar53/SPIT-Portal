const asyncHandler = require('express-async-handler');
const Appraisal = require('../models/appraisal.js')
const { error } = require("console");

const setAppraisal = asyncHandler(async (req, res) => {
    console.log("Inside setAppraisalDim1");
    try {
        const { Dimension1, Dimension2, Dimension3, Dimension4, finalGrandTotal } = req.body;

        //Dimension1 starts
        var total = 0;
        var avgAP1Marks = 0;
        var avgAP2Marks = 0;

        if (Dimension1.info.courses.length > 2) {
            avgAP1Marks = 10;
        } else {
            avgAP1Marks = Dimension1.info.courses.length * 4;
        }
        // ----------------------------------------------------------------------------------------

        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            total = total + Dimension1.info.courses[i].AP2MarksObtained;
        }
        avgAP2Marks = total / Dimension1.info.courses.length;

        avgAP2Marks = avgAP2Marks>10?10:avgAP2Marks;

        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            var averagePercent =
                (Dimension1.info.courses[i].AP3LectureConducted /
                    Dimension1.info.courses[i].AP3LecturesTarget) *
                100;
            Dimension1.info.courses[i].AP3PercentAchieved = averagePercent;
        }
        var totalTarget = 0;
        var averagePercent = 0;
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            totalTarget =
                totalTarget + Dimension1.info.courses[i].AP3PercentAchieved;
        }
        averagePercent = totalTarget / Dimension1.info.courses.length;

        if (averagePercent < 80) {
            //To be discussed
        }
        if (averagePercent >= 80 && averagePercent < 90) {
            Dimension1.info.AP3Marks = 3;
        }
        if (averagePercent >= 90 && averagePercent < 95) {
            Dimension1.info.AP3Marks = 4;
        }
        if (averagePercent >= 95 && averagePercent <= 100) {
            Dimension1.info.AP3Marks = 5;
        }
        // -----------------------------------------------------------------------------------

        var totalpercentAP4 = 0;
        var averagePercentAP4 = 0;
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            totalpercentAP4 =
                totalpercentAP4 + Dimension1.info.courses[i].AP4PercentFeedback;
        }
        averagePercentAP4 = totalpercentAP4 / Dimension1.info.courses.length;

        if (averagePercentAP4 > 30) {
            averagePercentAP4 = 30;
        }
        // -----------------------------------------------------------------------------------
        //AP5
        var totalAttendanceP5 = 0;
        var averageAttedanceAP5 = 0;
        var AP5Marks = 0;
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            totalAttendanceP5 =
                totalAttendanceP5 + Dimension1.info.courses[i].AP5AttendanceStudent;
        }
        averageAttedanceAP5 = totalAttendanceP5 / Dimension1.info.courses.length;

        if (averageAttedanceAP5 >= 90 && averageAttedanceAP5 <= 100) {
            AP5Marks = 5;
        } else if (averageAttedanceAP5 >= 80 && averageAttedanceAP5 < 90) {
            AP5Marks = 4;
        } else if (averageAttedanceAP5 >= 70 && averageAttedanceAP5 < 80) {
            AP5Marks = 3;
        } else if (averageAttedanceAP5 >= 60 && averageAttedanceAP5 < 70) {
            AP5Marks = 2;
        } else {
            AP5Marks = 1;
        }
        // ---------------------------------------------------------------------------------------
        //AP6
        var totalMenteeFeedback = 0;
        var averageMenteeFeedback = 0;
        for (var i = 0; i < Dimension1.AP6.menteeFeedback.length; i++) {
            totalMenteeFeedback =
                totalMenteeFeedback + Dimension1.AP6.menteeFeedback[i];
        }
        averageMenteeFeedback =
            totalMenteeFeedback / Dimension1.AP6.menteeFeedback.length;

        if (averageMenteeFeedback > 5) {
            averageMenteeFeedback = 5;
        }

        //  ---------------------------------------------------------------
        //AP7
        var totalpercentAP7 = Dimension1.AP7.guestLectureData.length == 1 ? 3 : 5;

        //  ---------------------------------------------------------------
        //AP10
        var totalAuditMarks = 0;
        var averageAuditMarks = 0;
        for (var i = 0; i < Dimension1.AP10.paper.length; i++) {
            totalAuditMarks = totalAuditMarks + Dimension1.AP10.paper[i].marks;
        }
        averageAuditMarks = totalAuditMarks / Dimension1.AP10.paper.length;

        if (averageAuditMarks > 10) {
            averageAuditMarks = 10;
        }

        // ---------------------------------------------------------------------------------

        Dimension1.info.AP1Marks = avgAP1Marks;
        Dimension1.info.AP2Average = avgAP2Marks;
        Dimension1.info.AP2Marks = avgAP2Marks;
        Dimension1.info.AP3Average = averagePercent;
        Dimension1.info.AP4Marks = averagePercentAP4;
        Dimension1.info.AP5Average = averageAttedanceAP5;
        Dimension1.info.AP5Marks = AP5Marks;
        Dimension1.AP6.averageMarks = averageMenteeFeedback;
        Dimension1.AP7.totalMarks = totalpercentAP7;
        Dimension1.AP10.averageMarks = averageAuditMarks;

        // ==========================================================================================================
        //Dimension2 starts

        // =============================================================================================================
        //Dimension3 starts

        var Dimension3Marks = 0;
        for (var i = 0; i < Dimension3.IP1.length; i++) {
            if (Dimension3.IP1[i].tick) {
                Dimension3Marks = Dimension3Marks + 20;
            }
        }
        for (var i = 0; i < Dimension3.IP2.length; i++) {
            if (Dimension3.IP2[i].tick) {
                Dimension3Marks = Dimension3Marks + 10;
            }
        }
        for (var i = 0; i < Dimension3.DP1.length; i++) {
            if (Dimension3.DP1[i].tick) {
                Dimension3Marks = Dimension3Marks + 10;
            }
        }
        // ------------------------------------------------------
        //OP
        var OPMarks = 0;
        OPMarks = 3 * Dimension3.OP1.organized.length;
        if (OPMarks > 15) {
            OPMarks = 15;
        }
        // ------------------------------------------------------
        //invited 
        var invitedmarks = 0;
        invitedmarks = 3 * Dimension3.Invited.invitedAt.length;
        if (invitedmarks > 15) {
            invitedmarks = 15;
        }

        // ------------------------------------------------------

        var countCollab = Dimension3.collaboration.institutionDetails.length;
        if (countCollab == 0) {
            Dimension3.collaboration.totalMarks = 0;
        } else if (countCollab <= 2) {
            Dimension3.collaboration.totalMarks = 5 * countCollab;
        } else {
            Dimension3.collaboration.totalMarks = 10;
        }

        // ------------------------------------------------------------

        var countCoGuide = Dimension3.coGuide.data.length;
        if (countCoGuide == 0) {
            Dimension3.coGuide.totalMarks = 0;
        } else if (countCoGuide <= 2) {
            Dimension3.coGuide.totalMarks = 5 * countCoGuide;
        } else {
            Dimension3.coGuide.totalMarks = 10;
        }

        // -----------------------------------------------

        var countArticle = Dimension3.Article.articleDetails.length;
        if (countArticle == 0) {
            Dimension3.Article.totalMarks = 0;
        } else if (countArticle <= 2) {
            Dimension3.Article.totalMarks = 5 * countArticle;
        } else {
            Dimension3.Article.totalMarks = 10;
        }

        // ----------------------------------------


        var countCommittee = Dimension3.Partof.committee.length;
        if (countCommittee == 0) {
            Dimension3.Article.totalMarks = 0;
        } else if (countCommittee <= 3) {
            Dimension3.Partof.totalMarks = 3 * countCommittee;
        } else {
            Dimension3.Partof.totalMarks = 10;
        }

        //   ------------------------------------------

        Dimension3.totalIP1IP2DP1Marks = Dimension3Marks;
        Dimension3.OP1.totalMarks = OPMarks;
        Dimension3.Invited.totalMarks = invitedmarks;

        // --------------------------------------------------------------------
        //Dimension4 starts
        Dimension4.feedbackMarks.E =
            Dimension4.feedbackMarks.A +
            Dimension4.feedbackMarks.B +
            Dimension4.feedbackMarks.C +
            Dimension4.feedbackMarks.D;


        Dimension4.confidentialReport.perceptionMarks =
            Dimension4.confidentialReport.principalRemarks *
            Dimension4.feedbackMarks.E;

        // finalGrandTotal.GrandTotal =
        //     finalGrandTotal.dimension1.finalMarks +
        //     finalGrandTotal.dimension2.finalMarks +
        //     finalGrandTotal.dimension3.finalMarks +
        //     finalGrandTotal.dimension4.finalMarks;

        // =============================================================================================================
        const newAppraisal = new Appraisal({
            Dimension1,
            Dimension2,
            Dimension3,
            Dimension4,
            finalGrandTotal,
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