
const asyncHandler = require('express-async-handler');
const Appraisal = require('../models/appraisal.js')
const { error } = require("console");

const getAppraisal = asyncHandler(async (req, res) => {
    console.log("Inside getAppraisal");
    try {
        var { yearofAssesment, facultyName, department, designation } = req.body;
        console.log(yearofAssesment);
        console.log(facultyName);
        console.log(department);
        console.log(designation);
        const appraisal = await Appraisal.findOne({ yearofAssesment, facultyName });
        console.log(appraisal);
        if (appraisal) {
            res.json(appraisal);
        } else {
            // res.status(404).json({ message: "Appraisal not found" });
            const newAppraisal = await Appraisal.create({
                yearofAssesment,
                facultyName,
                department,
                designation,
            })
            res.json(newAppraisal);

        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})


const setAppraisal = asyncHandler(async (req, res) => {
    console.log("Inside setAppraisalDim1");
    try {
        var { yearofAssesment, facultyName, department, designation, Dimension1, Dimension2, Dimension3, Dimension4, finalGrandTotal } = req.body;
        console.log(Dimension1);
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
        //AP2
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            total = total + Dimension1.info.courses[i].AP2MarksObtained;
        }
        if (Dimension1.info.courses.length > 0) {
            avgAP2Marks = total / Dimension1.info.courses.length;
        }

        avgAP2Marks = avgAP2Marks > 10 ? 10 : avgAP2Marks;

        // ---------------------------------------------------------------------
        //AP3
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
        if (Dimension1.info.courses.length > 0) {
            averagePercent = totalTarget / Dimension1.info.courses.length;
        }

        if (averagePercent < 80) {
            //To be discussed
            Dimension1.info.AP3Marks = 0;
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
        //AP4
        var totalpercentAP4 = 0;
        var averagePercentAP4 = 0;
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            totalpercentAP4 =
                totalpercentAP4 + Dimension1.info.courses[i].AP4PercentFeedback;
        }
        if (Dimension1.info.courses.length > 0) {
            averagePercentAP4 = totalpercentAP4 / Dimension1.info.courses.length;
        }


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
        if (Dimension1.AP6.menteeFeedback.length > 0) {
            averageMenteeFeedback =
                totalMenteeFeedback / Dimension1.AP6.menteeFeedback.length;
        }
        if (averageMenteeFeedback > 5) {
            averageMenteeFeedback = 5;
        }
        //  ---------------------------------------------------------------
        //AP7
        if (Dimension1.AP7.guestLectureData.length > 0) {
            var totalpercentAP7 = Dimension1.AP7.guestLectureData.length == 1 ? 3 : 5;
        }
        else {
            var totalpercentAP7 = 0;
        }
        //  ---------------------------------------------------------------
        //AP8

        var ap8totalmarks = 0
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            if (Dimension1.info.courses[i].AP8ActivityRemedial != "Null") {
                ap8totalmarks = ap8totalmarks + 2.5;
            }
        }
        if (ap8totalmarks > 5) {
            ap8totalmarks = 5;
        }
        //  ---------------------------------------------------------------
        //AP9

        var ap9totalmarks = 0
        for (var i = 0; i < Dimension1.info.courses.length; i++) {
            if (Dimension1.info.courses[i].AP9noteworthyDetails != "Null") {
                ap9totalmarks = ap9totalmarks + 10;
            }
        }
        if (Dimension1.info.courses.length > 0) {
            var ap9average = ap9totalmarks / Dimension1.info.courses.length;
            if (ap9average > 10) {
                ap9average = 10;
            }
        }
        else {
            var ap9average = 0;
        }


        //  ---------------------------------------------------------------
        //AP10
        // var totalAuditMarks = 0;
        // var averageAuditMarks = 0;
        // var count = 0;
        // for (var i = 0; i < Dimension1.info.courses.length; i++) {
        //     for (var j = 0; j < Dimension1.info.courses[i].AP10paperSet.length; j++) {
        //         totalAuditMarks = totalAuditMarks + Dimension1.info.courses[i].AP10paperSet[j].marks;
        //         if (Dimension1.info.courses[i].AP10paperSet[j].marks != 0) {
        //             count++;
        //         }
        //     }
        // }

        // if (count != 0) {
        //     averageAuditMarks = totalAuditMarks / count;

        //     if (averageAuditMarks > 10) {
        //         averageAuditMarks = 10;
        //     }
        // }
        // else {
        //     averageAuditMarks = 0;
        // }

        var totalAuditMarks = 0;
        var averageAuditMarks = 0;
        for (var i = 0; i < Dimension1.AP10.paper.length; i++) {
            totalAuditMarks = totalAuditMarks + Dimension1.AP10.paper[i].marks;

        }
        if (Dimension1.AP10.paper.length > 0) {
            averageAuditMarks = totalAuditMarks / Dimension1.AP10.paper.length;
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
        Dimension1.info.AP8Marks = ap8totalmarks;
        Dimension1.info.AP9Marks = ap9average;
        Dimension1.AP10.averageMarks = averageAuditMarks;
        // ----------------------------------------------
        Dimension1.totalMarks = Dimension1.info.AP1Marks + Dimension1.info.AP2Marks + Dimension1.info.AP3Marks + Dimension1.info.AP4Marks + Dimension1.info.AP5Marks + Dimension1.AP6.averageMarks + Dimension1.AP7.totalMarks + Dimension1.info.AP8Marks + Dimension1.info.AP9Marks + Dimension1.AP10.averageMarks;
        if (Dimension1.totalMarks > 100) {
            Dimension1.totalMarks = 100;
        }

        // ===========================================================================================================================
        // ===========================================================================================================================

        //Dimension2 starts

        //RP1
        var rp1marks = 0;
        for (var i = 0; i < Dimension2.RP1.papers.length; i++) {
            if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Journal" && Dimension2.RP1.papers[i].conferenceOrJournal.reputation == "High") {
                rp1marks = rp1marks + 20;
            }
            if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Journal" && Dimension2.RP1.papers[i].conferenceOrJournal.reputation == "Medium") {
                rp1marks = rp1marks + 15;
            }
            if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Journal" && Dimension2.RP1.papers[i].conferenceOrJournal.reputation == "None") {
                rp1marks = rp1marks + 10;
            }
            if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Conference" && Dimension2.RP1.papers[i].conferenceOrJournal.reputation == "High") {
                rp1marks = rp1marks + 10;
            }
            if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Conference" && (Dimension2.RP1.papers[i].conferenceOrJournal.reputation == "None" || Dimension2.RP1.papers[i].conferenceOrJournal.reputation == "Medium")) {
                rp1marks = rp1marks + 7;
            }
        }
        if (rp1marks > 30) {
            rp1marks = 30;
        }

        // ------------------------------------
        //RP2
        var rp2marks = 0;
        for (var i = 0; i < Dimension2.RP2.patents.length; i++) {
            if (Dimension2.RP2.patents[i].status == "Obtained") {
                rp2marks = rp2marks + 15;
            }
            if (Dimension2.RP2.patents[i].status == "Published") {
                rp2marks = rp2marks + 5;
            }
        }
        for (var i = 0; i < Dimension2.RP2.books.length; i++) {
            if (Dimension2.RP2.books[i].status == "Published") {
                rp2marks = rp2marks + 15;
            }
            if (Dimension2.RP2.books[i].status == "Book Chapter/Monograms/Copyright") {
                rp2marks = rp2marks + 5;
            }
        }
        for (var i = 0; i < Dimension2.RP2.moocs.length; i++) {
            if (Dimension2.RP2.moocs[i].duration < 8) {
                rp2marks = rp2marks + 0;
            }
            if (Dimension2.RP2.moocs[i].duration >= 8 && Dimension2.RP2.moocs[i].duration < 24) {
                rp2marks = rp2marks + 5;
            }
            if (Dimension2.RP2.moocs[i].duration >= 24 && Dimension2.RP2.moocs[i].duration < 40) {
                rp2marks = rp2marks + 15;
            }
            if (Dimension2.RP2.moocs[i].duration >= 40) {
                rp2marks = rp2marks + 20;
            }

        }

        if (rp2marks > 30) {
            rp2marks = 30;
        }

        // ----------------------------------
        //RP3
        //To be Discussed
        var rp3marks = 0;
        for (var i = 0; i < Dimension2.RP3.sponsored.length; i++) {
            if (Dimension2.RP3.sponsored[i].status == "Submitted") {
                rp3marks = rp3marks + 2;
            }
            if (Dimension2.RP3.sponsored[i].status == "Submitted and Approved") {
                if (Dimension2.RP3.sponsored[i].amount < 100000) {
                    rp3marks = rp3marks + 3 + 2;
                }
                else if (Dimension2.RP3.sponsored[i].amount >= 100000 && Dimension2.RP3.sponsored[i].amount < 500000) {
                    rp3marks = rp3marks + 5 + 2;
                }
                else if (Dimension2.RP3.sponsored[i].amount >= 500000 && Dimension2.RP3.sponsored[i].amount < 1000000) {
                    rp3marks = rp3marks + 7 + 2;
                }
                else {
                    rp3marks = rp3marks + 13 + 2;
                }
            }
        }
        if (rp3marks > 30) {
            rp3marks = 30;
        }
        //RP4

        // ----------------------------
        //RP5
        var rp5marks = 0
        for (var i = 0; i < Dimension2.RP5.selfDevelopment.length; i++) {
            if (Dimension2.RP5.selfDevelopment[i].type === "STTP" || Dimension2.RP5.selfDevelopment[i].type === "FDP") {
                rp5marks = rp5marks + (1 * Dimension2.RP5.selfDevelopment[i].duration);
            }
            if (Dimension2.RP5.selfDevelopment[i].type === "MOOC") {
                rp5marks = rp5marks + 1 * Dimension2.RP5.selfDevelopment[i].duration;
            }
            if (Dimension2.RP5.selfDevelopment[i].type === "Industry Internship") {
                rp5marks = rp5marks + (5 * Dimension2.RP5.selfDevelopment[i].duration);
            }
        }

        if (rp5marks > 20) {
            rp5marks = 20;
        }
        // -----------------------------------------------------
        //RP6
        Dimension2.RP6.softHardDev.length >= 2 ? Dimension2.RP6.totalMarks = 10 : Dimension2.RP6.totalMarks = 5 * Dimension2.RP6.softHardDev.length;

        // ------------------------------------
        //RP7
        Dimension2.RP7.activityNotCovered.length >= 2 ? Dimension2.RP7.totalMarks = 10 : Dimension2.RP7.totalMarks = 5 * Dimension2.RP7.activityNotCovered.length;
        // ------------------------------





        Dimension2.RP1.totalMarks = rp1marks;
        Dimension2.RP2.totalMarks = rp2marks;
        Dimension2.RP3.totalMarks = rp3marks;
        Dimension2.RP4.totalMarks = (Dimension2.RP4.number * 0.4) <= 25 ? (Dimension2.RP4.number * 0.4) : 25;
        Dimension2.RP5.totalMarks = rp5marks;

        //+ Dimension2.RP3.totalMarks
        Dimension2.totalMarks = Dimension2.RP1.totalMarks + Dimension2.RP2.totalMarks + Dimension2.RP2.totalMarks + Dimension2.RP4.totalMarks + Dimension2.RP5.totalMarks + Dimension2.RP6.totalMarks + Dimension2.RP7.totalMarks;
        Dimension2.totalMarks = (Dimension2.totalMarks / 150) * 100;




        //=============================================================================================================
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
        if (Dimension3Marks >= 60) {
            Dimension3Marks = 60;
        }
        // ------------------------------------------------------

        //OP1

        //organised
        var OPMarks = 0;
        var trainingMarks = 0;
        // OPMarks = 3 * Dimension3.OP1.organized.length;
        // if (OPMarks > 15) {
        //     OPMarks = 15;
        // }
        for (var i = 0; i < Dimension3.OP1.organized.length; i++) {
            if (Dimension3.OP1.organized[i].type == "FDP") {
                if (Dimension3.OP1.organized[i].days < 14) {
                    OPMarks = OPMarks + 10;
                }
                if (Dimension3.OP1.organized[i].days >= 14) {
                    OPMarks = OPMarks + 15;
                }
            }
            if (Dimension3.OP1.organized[i].type == "Training Organised") {
                trainingMarks = trainingMarks + (3 * Dimension3.OP1.organized[i].days);
            }
        }
        if (trainingMarks > 15) {
            trainingMarks = 15;
        }

        OPMarks = OPMarks + trainingMarks;

        // ------------------------------------------------------
        //invited 
        var invitedmarks = 0;
        var guestmarks = 0;
        var invitedfinalmarks = 0;
        for (var i = 0; i < Dimension3.Invited.invitedAt.length; i++) {
            if (Dimension3.Invited.invitedAt[i].type == "Guest Faculty") {
                guestmarks = guestmarks + 3;
            }
            if (Dimension3.Invited.invitedAt[i].type == "Visiting Professor") {
                invitedmarks = invitedmarks + 5;

            }
        }

        if (invitedmarks > 15) {
            invitedmarks = 15;
        }
        if (guestmarks > 10) {
            guestmarks = 10;
        }
        invitedfinalmarks = (invitedmarks + guestmarks) > 15 ? 15 : (invitedmarks + guestmarks);

        // ----------------------------------------


        var countCommittee = Dimension3.Partof.committee.length;
        if (countCommittee == 0) {
            Dimension3.Partof.totalMarks = 0;
        } else if (countCommittee <= 3) {
            Dimension3.Partof.totalMarks = 3 * countCommittee;
        } else {
            Dimension3.Partof.totalMarks = 10;
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
        // ------------------------------------------------------------

        var countCoGuide = Dimension3.coGuide.data.length;
        if (countCoGuide == 0) {
            Dimension3.coGuide.totalMarks = 0;
        } else if (countCoGuide <= 2) {
            Dimension3.coGuide.totalMarks = 5 * countCoGuide;
        } else {
            Dimension3.coGuide.totalMarks = 10;
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




        //   ------------------------------------------

        Dimension3.totalIP1IP2DP1Marks = Dimension3Marks;
        Dimension3.OP1.totalMarks = OPMarks;
        Dimension3.Invited.totalMarks = invitedfinalmarks;
        const tempOP = (Dimension3.OP1.totalMarks + Dimension3.Invited.totalMarks + Dimension3.Partof.totalMarks + Dimension3.Article.totalMarks + Dimension3.coGuide.totalMarks + Dimension3.collaboration.totalMarks) > 40 ? 40 : (Dimension3.OP1.totalMarks + Dimension3.Invited.totalMarks + Dimension3.Partof.totalMarks + Dimension3.Article.totalMarks + Dimension3.coGuide.totalMarks + Dimension3.collaboration.totalMarks);

        Dimension3.totalMarks = Dimension3.totalIP1IP2DP1Marks + tempOP;

        // ===============================================================
        // --------------------------------------------------------------------
        //Dimension4 starts
        // Dimension4.feedbackMarks.E =
        //     Dimension4.feedbackMarks.A +
        //     Dimension4.feedbackMarks.B +
        //     Dimension4.feedbackMarks.C +
        //     Dimension4.feedbackMarks.D;


        // Dimension4.confidentialReport.perceptionMarks =
        //     Dimension4.confidentialReport.principalRemarks * Dimension4.feedbackMarks.E;


        finalGrandTotal = {
            dimension1: {
                totalMarks: 0,
                finalMarks: 0
            },
            dimension2: {
                totalMarks: 0,
                finalMarks: 0
            },
            dimension3: {
                totalMarks: 0,
                finalMarks: 0
            },
            dimension4: {
                totalMarks: 0,
                finalMarks: 0
            },
        }

        finalGrandTotal.dimension1.totalMarks = Dimension1.totalMarks;
        finalGrandTotal.dimension2.totalMarks = Dimension2.totalMarks;
        finalGrandTotal.dimension3.totalMarks = Dimension3.totalMarks;
        //finalGrandTotal.dimension4.totalMarks = Dimension4.confidentialReport.perceptionMarks;

        finalGrandTotal.dimension1.finalMarks = finalGrandTotal.dimension1.totalMarks * 0.4;
        finalGrandTotal.dimension2.finalMarks = finalGrandTotal.dimension2.totalMarks * 0.2;
        finalGrandTotal.dimension3.finalMarks = finalGrandTotal.dimension3.totalMarks * 0.2;
        finalGrandTotal.dimension4.finalMarks = finalGrandTotal.dimension4.totalMarks * 0.2;


        finalGrandTotal.GrandTotal =
            finalGrandTotal.dimension1.finalMarks +
            finalGrandTotal.dimension2.finalMarks +
            finalGrandTotal.dimension3.finalMarks +
            finalGrandTotal.dimension4.finalMarks;


        // =============================================================================================================
        // const newAppraisal = new Appraisal({
        //     yearofAssesment,
        //     facultyName,
        //     department,
        //     designation,
        //     Dimension1,
        //     Dimension2,
        //     Dimension3,
        //     Dimension4,
        //     finalGrandTotal,
        // });
        // const savedAppraisal = await newAppraisal.save();

        const appraisal = await Appraisal.findOne({ facultyName: facultyName, yearofAssesment: yearofAssesment });
        if (appraisal) {
            appraisal.yearofAssesment = yearofAssesment;
            appraisal.facultyName = facultyName;
            appraisal.department = department;
            appraisal.designation = designation;
            appraisal.Dimension1 = Dimension1;
            appraisal.Dimension2 = Dimension2;
            appraisal.Dimension3 = Dimension3;
            appraisal.Dimension4 = Dimension4;
            appraisal.finalGrandTotal = finalGrandTotal;
        } else {
            res.status(404).send('🤦‍♂️🤦‍♂️🤦‍♂️🙅‍♂️🙅‍♂️🙅‍♂️');
        }

        res.status(200).json(appraisal);
    } catch (error) {
        console.error('Error saving appraisal:', error);
        throw error;
    }
})

const setDim1 = asyncHandler(async (req, res) => {
    try {
        const { yearofAssesment, faculty, Dimension1 } = req.body;
        var updatedApp = null;

        const existingFaculty = await Appraisal.findOne({
            facultyName: faculty.fullName,
            yearofAssesment: yearofAssesment,
        });

        if (existingFaculty) {
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                { $set: { Dimension1: Dimension1 } }
            );
        } else {
            updatedApp = await Appraisal.create({
                facultyName: faculty.fullName,
                department: faculty.department,
                designation: faculty.designation,
                yearofAssesment: yearofAssesment,
                Dimension1: Dimension1,
            });
        }

        res.status(200).json(updatedApp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getDim1 = asyncHandler(async (req, res) => {
    try {
        const { name, yearofAssesment } = req.body
        const facultyInfo = await Appraisal.findOne({
            facultyName: name,
            yearofAssesment: yearofAssesment,
        })
        if (facultyInfo) {
            res.status(200).json(facultyInfo.Dimension1)
        }
        else {
            res.status(404)
        }
    } catch (error) {
        console.log(error)
    }
})

const setDim2 = asyncHandler(async (req, res) => {
    try {
        const { yearofAssesment, faculty, Dimension2 } = req.body;
        var updatedApp = null;

        const existingFaculty = await Appraisal.findOne({
            facultyName: faculty.fullName,
            yearofAssesment: yearofAssesment,
        });

        if (existingFaculty) {
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                { $set: { Dimension2: Dimension2 } }
            );
        } else {
            updatedApp = await Appraisal.create({
                facultyName: faculty.fullName,
                department: faculty.department,
                designation: faculty.designation,
                yearofAssesment: yearofAssesment,
                Dimension2: Dimension2,
            });
        }

        res.status(200).json(updatedApp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getDim2 = asyncHandler(async (req, res) => {
    try {
        const { name, yearofAssesment } = req.body
        const facultyInfo = await Appraisal.findOne({
            facultyName: name,
            yearofAssesment: yearofAssesment,
        })
        if (facultyInfo) {
            res.status(200).json(facultyInfo.Dimension2)
        }
        else {
            res.status(404)
        }
    } catch (error) {
        console.log(error)
    }
})

const setDim3 = asyncHandler(async (req, res) => {
    try {
        const { yearofAssesment, faculty, Dimension3 } = req.body;
        var updatedApp = null;

        const existingFaculty = await Appraisal.findOne({
            facultyName: faculty.fullName,
            yearofAssesment: yearofAssesment,
        });

        if (existingFaculty) {
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                { $set: { Dimension3: Dimension3 } }
            );
        } else {
            updatedApp = await Appraisal.create({
                facultyName: faculty.fullName,
                department: faculty.department,
                designation: faculty.designation,
                yearofAssesment: yearofAssesment,
                Dimension3: Dimension3,
            });
        }

        res.status(200).json(updatedApp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getDim3 = asyncHandler(async (req, res) => {
    try {
        const { name, yearofAssesment } = req.body
        const facultyInfo = await Appraisal.findOne({
            facultyName: name,
            yearofAssesment: yearofAssesment,
        })
        if (facultyInfo) {
            res.status(200).json(facultyInfo.Dimension3)
        }
        else {
            res.status(404)
        }
    } catch (error) {
        console.log(error)
    }
})

const setDim4 = asyncHandler(async (req, res) => {
    try {
        const { yearofAssesment, faculty, Dimension4 } = req.body;
        var updatedApp = null;

        const existingFaculty = await Appraisal.findOne({
            facultyName: faculty.fullName,
            yearofAssesment: yearofAssesment,
        });

        if (existingFaculty) {
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                { $set: { Dimension4: Dimension4 } }
            );
        } else {
            updatedApp = await Appraisal.create({
                facultyName: faculty.fullName,
                department: faculty.department,
                designation: faculty.designation,
                yearofAssesment: yearofAssesment,
                Dimension4: Dimension4,
            });
        }

        res.status(200).json(updatedApp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getDim4 = asyncHandler(async (req, res) => {
    try {
        const { name, yearofAssesment } = req.body
        const facultyInfo = await Appraisal.findOne({
            facultyName: name,
            yearofAssesment: yearofAssesment,
        })
        if (facultyInfo) {
            res.status(200).json(facultyInfo.Dimension4)
        }
        else {
            res.status(404)
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    setAppraisal,
    setDim1,
    getDim1,
    setDim2,
    getDim2,
    setDim3,
    getDim3,
    setDim4,
    getDim4,
}