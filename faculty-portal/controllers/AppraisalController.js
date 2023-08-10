
const asyncHandler = require('express-async-handler');
const Appraisal = require('../models/appraisal.js')
const { error } = require("console");

const getAppraisal = asyncHandler(async (req, res) => {
    
    try {
        var { yearofAssesment, facultyName } = req.body;
        
        const appraisal = await Appraisal.findOne({ yearofAssesment, facultyName });
        
        if (appraisal) {
            res.json(appraisal);
        }
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})

const getAllAppraisal = asyncHandler(async (req, res) => {
    
    try {
        var { facultyName } = req.body;
        
        const appraisals = await Appraisal.find({ facultyName, isSubmitted: true }, { yearofAssesment: 1 });
        
        if (appraisals) {
            res.json(appraisals);
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error in getAllAppraisals" });
    }
})

const getAllHODAppraisal = asyncHandler(async (req, res) => {
    console.log("Inside getAllAppraisal");
    try {
        var { facultyName } = req.body;
        
        const appraisals = await Appraisal.find({ facultyName, isSubmitted: true, HODReviewed: true }, { yearofAssesment: 1 });
        
        if (appraisals) {
            res.json(appraisals);
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error in getAllAppraisals" });
    }
})


const setAppraisal = asyncHandler(async (req, res) => {
   
    try {
        var { yearofAssesment, facultyName, department, designation } = req.body;
      
        const appraisal = await Appraisal.findOne({ yearofAssesment, facultyName });
       
        appraisal.isSubmitted = true;
        if (appraisal.designation == "HOD") {
            appraisal.HODReviewed = true;
        }
        var Dimension1 = appraisal.Dimension1;
        var Dimension2 = appraisal.Dimension2;
        var Dimension3 = appraisal.Dimension3;
        var Dimension4 = appraisal.Dimension4;
        var finalGrandTotal = appraisal.finalGrandTotal;
        


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
        

        finalGrandTotal.dimension1.finalMarks = finalGrandTotal.dimension1.totalMarks * 0.4;
        finalGrandTotal.dimension2.finalMarks = finalGrandTotal.dimension2.totalMarks * 0.2;
        finalGrandTotal.dimension3.finalMarks = finalGrandTotal.dimension3.totalMarks * 0.2;
        finalGrandTotal.dimension4.finalMarks = finalGrandTotal.dimension4.totalMarks * 0.2;


        finalGrandTotal.GrandTotal =
            finalGrandTotal.dimension1.finalMarks +
            finalGrandTotal.dimension2.finalMarks +
            finalGrandTotal.dimension3.finalMarks +
            finalGrandTotal.dimension4.finalMarks;


        
        await appraisal.save();
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
            
            var total = 0;
            var avgAP1Marks = 0;
            var avgAP2Marks = 0;
            var totalpercentAP4 = 0;
            var averagePercentAP4 = 0;
            var totalAttendanceP5 = 0;
            var averageAttedanceAP5 = 0;
            var AP5Marks = 0;
            var averagePercent = 0;
            var totalTarget = 0;
            var averagePercent2 = 0;
            var finalAP3 = 0
            if (Dimension1.info.courses.length > 0) {
                if (Dimension1.info.courses.length >= 4) {
                    avgAP1Marks = 10;
                } else {
                    avgAP1Marks = Dimension1.info.courses.length * 3;
                }
                // ----------------------------------------------------------------------------------------
                //AP2
                for (var i = 0; i < Dimension1.info.courses.length; i++) {
                    total = total + Dimension1.info.courses[i].AP2MarksObtained;
                }
                if (Dimension1.info.courses.length > 0) {
                    avgAP2Marks = total / Dimension1.info.courses.length;
                }
                Dimension1.info.AP2Average = avgAP2Marks.toFixed(2);
                avgAP2Marks = avgAP2Marks > 10 ? 10 : avgAP2Marks;
                Dimension1.info.AP2Marks = avgAP2Marks.toFixed(2);

                // ---------------------------------------------------------------------
                //AP3
                for (var i = 0; i < Dimension1.info.courses.length; i++) {
                    if (parseInt(Dimension1.info.courses[i].AP3LecturesTarget) == 0 || !Dimension1.info.courses[i].AP3LectureConducted || !Dimension1.info.courses[i].AP3LecturesTarget) {
                        Dimension1.info.courses[i].AP3PercentAchieved = 0;
                        continue;
                    }
                    var averagePercent =
                        (parseInt(Dimension1.info.courses[i].AP3LectureConducted) /
                            parseInt(Dimension1.info.courses[i].AP3LecturesTarget)) *
                        100;
                    Dimension1.info.courses[i].AP3PercentAchieved = parseFloat(averagePercent.toFixed(2));
                }
                var totalTarget = 0;
                var averagePercent2 = 0;
                for (var i = 0; i < Dimension1.info.courses.length; i++) {
                    totalTarget =
                        totalTarget + parseInt(Dimension1.info.courses[i].AP3PercentAchieved);
                }
                if (Dimension1.info.courses.length > 0) {
                    averagePercent2 = totalTarget / Dimension1.info.courses.length;
                }

                if (averagePercent2 < 80) {
                    
                    finalAP3 = 0;
                }
                if (averagePercent2 >= 80 && averagePercent2 < 90) {
                    finalAP3 = 3;
                }
                if (averagePercent2 >= 90 && averagePercent2 < 95) {
                    finalAP3 = 4;
                }
                if (averagePercent2 >= 95 && averagePercent2 <= 100) {
                    finalAP3 = 5;
                }
                // -----------------------------------------------------------------------------------
                //AP4

                for (var i = 0; i < Dimension1.info.courses.length; i++) {
                    if (Dimension1.info.courses[i].AP4PercentFeedback) {
                        totalpercentAP4 =
                            totalpercentAP4 + parseInt(Dimension1.info.courses[i].AP4PercentFeedback);
                    }
                }
                if (Dimension1.info.courses.length > 0) {
                    averagePercentAP4 = totalpercentAP4 / Dimension1.info.courses.length;
                }
                if (averagePercentAP4 > 30) {
                    averagePercentAP4 = 30;
                }
               

                // -----------------------------------------------------------------------------------
                //AP5

                for (var i = 0; i < Dimension1.info.courses.length; i++) {
                    if (Dimension1.info.courses[i].AP5AttendanceStudent) {
                        totalAttendanceP5 = totalAttendanceP5 + parseInt(Dimension1.info.courses[i].AP5AttendanceStudent);
                    }
                }
                averageAttedanceAP5 = totalAttendanceP5 / Dimension1.info.courses.length;
                if (averageAttedanceAP5 == 0) {
                    AP5Marks = 0;
                }
                else if (averageAttedanceAP5 >= 90 && averageAttedanceAP5 <= 100) {
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
           
            for (var i = 0; i < Dimension1.AP8.remedialData.length; i++) {
                // if (Dimension1.AP8.remedialData[i] != "Null") {
                ap8totalmarks = ap8totalmarks + 2.5;
                // }
            }
            if (ap8totalmarks > 5) {
                ap8totalmarks = 5;
            }
            //  ---------------------------------------------------------------
            //AP9

            var ap9totalmarks = 0
            for (var i = 0; i < Dimension1.AP9.noteworthyData.length; i++) {
                
                if (Dimension1.AP9.noteworthyData[i].marksOutOf10) {
                    ap9totalmarks = ap9totalmarks + parseInt(Dimension1.AP9.noteworthyData[i].marksOutOf10);
                }
                
            }
            if (Dimension1.AP9.noteworthyData.length > 0) {
                var ap9average = ap9totalmarks / parseInt(Dimension1.AP9.noteworthyData.length);
                if (ap9average > 10) {
                    ap9average = 10;
                }
            }
            else {
                var ap9average = 0;
            }
            //  ---------------------------------------------------------------
            //AP10
            var totalAuditMarks = 0;
            var averageAuditMarks = 0;
            for (var i = 0; i < Dimension1.AP10.paper.length; i++) {
                if (Dimension1.AP10.paper[i].marks) {
                    totalAuditMarks = totalAuditMarks + parseInt(Dimension1.AP10.paper[i].marks);
                }
            }
            if (Dimension1.AP10.paper.length > 0) {
                averageAuditMarks = totalAuditMarks / parseInt(Dimension1.AP10.paper.length);
            }

            if (averageAuditMarks > 10) {
                averageAuditMarks = 10;
            }
            // ---------------------------------------------------------------------------------
            Dimension1.info.AP1Marks = parseFloat(avgAP1Marks.toFixed(2));
            Dimension1.info.AP2Average = parseFloat(avgAP2Marks.toFixed(2));
            Dimension1.info.AP2Marks = parseFloat(avgAP2Marks.toFixed(2));
            Dimension1.info.AP3Average = parseFloat(averagePercent.toFixed(2));
            Dimension1.info.AP3Marks = parseFloat(finalAP3.toFixed(2));
            Dimension1.info.AP4Marks = parseFloat(averagePercentAP4.toFixed(2));
            Dimension1.info.AP5Average = parseFloat(averageAttedanceAP5.toFixed(2));
            Dimension1.info.AP5Marks = parseFloat(AP5Marks.toFixed(2));
            Dimension1.AP6.averageMarks = parseFloat(averageMenteeFeedback.toFixed(2));
            Dimension1.AP7.totalMarks = parseFloat(totalpercentAP7.toFixed(2));
            Dimension1.AP8.totalMarks = parseFloat(ap8totalmarks.toFixed(2));
            Dimension1.AP9.average = parseFloat(ap9average.toFixed(2));
            Dimension1.AP10.averageMarks = parseFloat(averageAuditMarks.toFixed(2));

            // ----------------------------------------------
            Dimension1.totalMarks = Dimension1.info.AP1Marks + Dimension1.info.AP2Marks + Dimension1.info.AP3Marks + Dimension1.info.AP4Marks + Dimension1.info.AP5Marks + Dimension1.AP6.averageMarks + Dimension1.AP7.totalMarks + Dimension1.AP8.totalMarks + Dimension1.AP9.average + Dimension1.AP10.averageMarks;
            if (Dimension1.totalMarks > 100) {
                Dimension1.totalMarks = 100;
            }
            
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                {
                    $set: {
                        facultyName: faculty.fullName,
                        department: faculty.department,
                        designation: faculty.designation,
                        yearofAssesment: yearofAssesment,
                        Dimension1: Dimension1
                    }
                }
            );
        } else {
            console.log("inside new faculty")
            updatedApp = await Appraisal.create({
                facultyName: faculty.fullName,
                department: faculty.department,
                designation: faculty.designation,
                yearofAssesment: yearofAssesment,
                Dimension1: Dimension1,
            });
        }

        

        const marks = {
            AP1: Dimension1.info.AP1Marks,
            AP2: Dimension1.info.AP2Marks,
            AP3: Dimension1.info.AP3Marks,
            AP4: Dimension1.info.AP4Marks,
            AP5: Dimension1.info.AP5Marks,
            AP6: Dimension1.AP6.averageMarks,
            AP7: Dimension1.AP7.totalMarks,
            AP8: Dimension1.AP8.totalMarks,
            AP9: Dimension1.AP9.average,
            AP10: Dimension1.AP10.averageMarks,
            totalMarks: Dimension1.totalMarks,
        }
        
        res.status(200).json(marks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getDim1 = asyncHandler(async (req, res) => {
    try {
        const { faculty, yearofAssesment } = req.body
        const facultyInfo = await Appraisal.findOne({
            facultyName: faculty.fullName,
            yearofAssesment: yearofAssesment,
        })
        if (facultyInfo) {
            res.status(200).json(facultyInfo)
        }
        else {
            const newappraisal = await Appraisal.create({
                facultyName: faculty.fullName,
                yearofAssesment: yearofAssesment,
                designation: faculty.designation,
                department: faculty.department,
            })
            res.json(newappraisal);
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
            var rp1marks = 0;
            for (var i = 0; i < Dimension2.RP1.papers.length; i++) {
                if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Journal" && Dimension2.RP1.papers[i].conferenceOrJournal.reputation == "High") {
                    rp1marks = rp1marks + 30;
                }

                if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Journal" && Dimension2.RP1.papers[i].conferenceOrJournal.reputation != "High") {
                    rp1marks = rp1marks + 10;
                }
                if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Conference" && Dimension2.RP1.papers[i].conferenceOrJournal.reputation == "High") {
                    rp1marks = rp1marks + 10;
                }
                if (Dimension2.RP1.papers[i].conferenceOrJournal.type == "Conference" && (Dimension2.RP1.papers[i].conferenceOrJournal.reputation != "High")) {
                    rp1marks = rp1marks + 7;
                }
            }
            if (rp1marks > 30) {
                rp1marks = 30;
            }

            // ------------------------------------
            //RP2
            var rp2marks = 0;
            var patents = 0;
            for (var i = 0; i < Dimension2.RP2.patents.length; i++) {
                if (Dimension2.RP2.patents[i].status == "Obtained") {
                    patents = patents + 30;
                }
                if (Dimension2.RP2.patents[i].status == "Published") {
                    patents = patents + 5;
                }
            }
            var books = 0;
            for (var i = 0; i < Dimension2.RP2.books.length; i++) {
                if (Dimension2.RP2.books[i].status == "Published") {
                    books = books + 30;
                }
                if (Dimension2.RP2.books[i].status == "Book Chapter/Monograms/Copyright") {
                    books = books + 5;
                }
            }

            var moocs = 0;
            for (var i = 0; i < Dimension2.RP2.moocs.length; i++) {
                if (Dimension2.RP2.moocs[i].duration < 8) {
                    moocs = moocs + 0;
                }
                if (Dimension2.RP2.moocs[i].duration >= 8 && Dimension2.RP2.moocs[i].duration < 24) {
                    moocs = moocs + 10;
                }
                if (Dimension2.RP2.moocs[i].duration >= 24 && Dimension2.RP2.moocs[i].duration < 40) {
                    moocs = moocs + 20;
                }
                if (Dimension2.RP2.moocs[i].duration >= 40) {
                    moocs = moocs + 30;
                }
            }
            rp2marks = patents + books + moocs;
            Dimension2.RP2.patentMarks = patents;
            Dimension2.RP2.booksMarks = books;
            Dimension2.RP2.moocsMarks = moocs;

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
                    rp5marks = rp5marks + parseInt((1 * Dimension2.RP5.selfDevelopment[i].duration));
                }
                if (Dimension2.RP5.selfDevelopment[i].type === "MOOC") {
                   
                    rp5marks = rp5marks + (1 * parseInt((Dimension2.RP5.selfDevelopment[i].duration / 7)));
                }
                if (Dimension2.RP5.selfDevelopment[i].type === "Industry Internship") {
                   
                    rp5marks = rp5marks + (5 * parseInt((Dimension2.RP5.selfDevelopment[i].duration / 7)));
                }
            }

            if (rp5marks > 25) {
                rp5marks = 25;
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

            
            Dimension2.totalMarks = Dimension2.RP1.totalMarks + Dimension2.RP2.totalMarks + Dimension2.RP2.totalMarks + Dimension2.RP4.totalMarks + Dimension2.RP5.totalMarks + Dimension2.RP6.totalMarks + Dimension2.RP7.totalMarks;
            Dimension2.totalMarks = (Dimension2.totalMarks / 150) * 100;
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                {
                    $set: {
                        facultyName: faculty.fullName,
                        department: faculty.department,
                        designation: faculty.designation,
                        yearofAssesment: yearofAssesment,
                        Dimension2: Dimension2
                    }
                }
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
        const fac = await Appraisal.findOne({ facultyName: faculty.fullName, yearofAssesment: yearofAssesment });
        res.status(200).json(fac.Dimension2);
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
            
            for (var i = 0; i < Dimension3.OP1.organized.length; i++) {
                
                OPMarks = OPMarks + (5 * Dimension3.OP1.organized[i].days)
            }
            
            var invitedfinalmarks = 0;
            for (var i = 0; i < Dimension3.Invited.invitedAt.length; i++) {
                
                invitedfinalmarks = invitedfinalmarks + (Dimension3.Invited.invitedAt[i].duration * 5)
            }
            

            op3Marks = 0
            for (var i = 0; i < Dimension3.op3.receivedFDP.length; i++) {
                if (Dimension3.op3.receivedFDP[i].days >= 14) {
                    op3Marks = op3Marks + 15
                    continue
                }
                if (Dimension3.op3.receivedFDP[i].days >= 7) {
                    op3Marks = op3Marks + 10
                }
            }

            if (op3Marks > 15) {
                op3Marks = 15
            }

            Dimension3.op3.totalMarks = op3Marks

            // --------------------------------------------------------
            // op4

            op4Marks = 0
            for (var i = 0; i < Dimension3.op4.invitedTalk.length; i++) {
                op4Marks = op4Marks + 5
            }

            if (op4Marks > 10) {
                op4Marks = 10
            }

            Dimension3.op4.totalMarks = op4Marks

            // ---------------------------------------------------------

            var countCommittee = Dimension3.Partof.committee.length;
            if (countCommittee == 0) {
                Dimension3.Partof.totalMarks = 0;
            } else if (countCommittee <= 2) {
                Dimension3.Partof.totalMarks = 5 * countCommittee;
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

            // -----------------------------------------------
            var countNGO = Dimension3.ngo.data.length;
            if (countNGO == 0) {
                Dimension3.ngo.totalMarks = 0;
            } else if (countNGO <= 2) {
                Dimension3.ngo.totalMarks = 5 * countNGO;
            } else {
                Dimension3.ngo.totalMarks = 10;
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
            const tempOP = (Dimension3.OP1.totalMarks + Dimension3.Invited.totalMarks + Dimension3.op3.totalMarks + Dimension3.op4.totalMarks + Dimension3.Partof.totalMarks + Dimension3.Article.totalMarks + Dimension3.ngo.totalMarks + Dimension3.coGuide.totalMarks + Dimension3.collaboration.totalMarks) > 40 ? 40 : (Dimension3.OP1.totalMarks + Dimension3.Invited.totalMarks + Dimension3.op3.totalMarks + Dimension3.op4.totalMarks + Dimension3.Partof.totalMarks + Dimension3.Article.totalMarks + Dimension3.ngo.totalMarks + Dimension3.coGuide.totalMarks + Dimension3.collaboration.totalMarks);

            Dimension3.totalMarks = Dimension3.totalIP1IP2DP1Marks + tempOP;
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                {
                    $set: {
                        facultyName: faculty.fullName,
                        department: faculty.department,
                        designation: faculty.designation,
                        yearofAssesment: yearofAssesment,
                        Dimension3: Dimension3
                    }
                }
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
        const fac = await Appraisal.findOne({ facultyName: faculty.fullName, yearofAssesment: yearofAssesment });
        res.status(200).json(fac.Dimension3);
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

const setDim4HOD = asyncHandler(async (req, res) => {
    try {
        const { yearofAssesment, fullName, Dimension4 } = req.body;
        Dimension4.feedbackMarks.E = parseInt(Dimension4.feedbackMarks.A) + parseInt(Dimension4.feedbackMarks.B) + parseInt(Dimension4.feedbackMarks.C);
        var updatedApp = null;

        const existingFaculty = await Appraisal.findOne({
            facultyName: fullName,
            yearofAssesment: yearofAssesment,
        });

        if (existingFaculty) {
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                { $set: { Dimension4: Dimension4, HODReviewed: true } }
            );
        } else {
            return res.status(404).json("Faculty Not Found In setDim4")
        }

        updatedApp = await Appraisal.findOne(
            { _id: existingFaculty._id }
        )
      
        res.status(200).json(updatedApp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const setDim4Principal = asyncHandler(async (req, res) => {
    try {
        const { yearofAssesment, fullName, Dimension4 } = req.body;
        var updatedApp = null;
        
        Dimension4.feedbackMarks.E = parseInt(Dimension4.feedbackMarks.A) + parseInt(Dimension4.feedbackMarks.B) + parseInt(Dimension4.feedbackMarks.C);
        Dimension4.confidentialReport.perceptionMarks = Dimension4.feedbackMarks.E * Dimension4.confidentialReport.principalRemarks;

        const existingFaculty = await Appraisal.findOne({
            facultyName: fullName,
            yearofAssesment: yearofAssesment,
        });

        if (existingFaculty) {
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                { $set: { Dimension4: Dimension4 } }
            );
        } else {
            return res.status(404).json("Faculty Not Found In setDim4")
        }

        updatedApp = await Appraisal.findOne(
            { _id: existingFaculty._id }
        )
    
        updatedApp.finalGrandTotal.dimension1.totalMarks = updatedApp.Dimension1.totalMarks;
        updatedApp.finalGrandTotal.dimension2.totalMarks = updatedApp.Dimension2.totalMarks;
        updatedApp.finalGrandTotal.dimension3.totalMarks = updatedApp.Dimension3.totalMarks;
        updatedApp.finalGrandTotal.dimension4.totalMarks = updatedApp.Dimension4.confidentialReport.perceptionMarks;

        updatedApp.finalGrandTotal.dimension1.finalMarks = updatedApp.finalGrandTotal.dimension1.totalMarks * updatedApp.finalGrandTotal.dimension1.multiplyingFactor;
        updatedApp.finalGrandTotal.dimension2.finalMarks = updatedApp.finalGrandTotal.dimension2.totalMarks * updatedApp.finalGrandTotal.dimension2.multiplyingFactor;
        updatedApp.finalGrandTotal.dimension3.finalMarks = updatedApp.finalGrandTotal.dimension3.totalMarks * updatedApp.finalGrandTotal.dimension3.multiplyingFactor;
        updatedApp.finalGrandTotal.dimension4.finalMarks = updatedApp.finalGrandTotal.dimension4.totalMarks * updatedApp.finalGrandTotal.dimension4.multiplyingFactor;

        updatedApp.finalGrandTotal.GrandTotal = updatedApp.finalGrandTotal.dimension1.finalMarks + updatedApp.finalGrandTotal.dimension2.finalMarks + updatedApp.finalGrandTotal.dimension3.finalMarks + updatedApp.finalGrandTotal.dimension4.finalMarks;

      
        updatedApp = await Appraisal.findOneAndUpdate(
            { _id: existingFaculty._id },
            { $set: { finalGrandTotal: updatedApp.finalGrandTotal } }
        );
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

const isSubmittedTeacher = asyncHandler(async (req, res) => {
    try {
        const { name, yearofAssesment } = req.body
        const facultyInfo = await Appraisal.findOne({
            facultyName: name,
            yearofAssesment: yearofAssesment,
        })
        if (facultyInfo && facultyInfo.isSubmitted) {
            res.status(200).json("teacher has already submitted")
        }
        else {
            res.status(204).json("teacher has not submitted")
        }
    } catch (error) {
        console.log(error)
    }
})

const setHodComments = asyncHandler(async (req, res) => {
    const { yearofAssesment, fullName, comment } = req.body;

    try {
        const existingFaculty = await Appraisal.findOne({
            facultyName: fullName,
            yearofAssesment: yearofAssesment,
        });
        var commentArr = []
        if (existingFaculty.HODcomments) {
            commentArr = existingFaculty.HODcomments;
            commentArr.push(comment);
        } else {
            commentArr.push(comment);
        }
        if (existingFaculty) {
            await Appraisal.findOneAndUpdate(
                { yearofAssesment: yearofAssesment, facultyName: fullName },
                { $set: { HODcomments: commentArr, isSubmitted: false } }
            );
        } else {
            return res.status(404).json([])
        }
        res.status(200).json("HOD comments added successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getHodComments = asyncHandler(async (req, res) => {
    const { yearofAssesment, fullName } = req.body;
    const existingFaculty = await Appraisal.findOne({
        facultyName: fullName,
        yearofAssesment: yearofAssesment,
    });
    if (existingFaculty) {
        res.status(200).json(existingFaculty.HODcomments);
    }
    else {
        res.status(404).json("")
    }

})

const getMarksDim1 = asyncHandler(async (req, res) => {
    const { yearofAssesment, fullName } = req.body;
    const existingFaculty = await Appraisal.findOne({
        facultyName: fullName,
        yearofAssesment: yearofAssesment,
    });
    if (existingFaculty) {
        res.status(200).json(existingFaculty.Dimension1);
    }
    else {
        res.status(404).json("")
    }

})

const principalSubmit = asyncHandler(async (req, res) => {
    
    try {
        const { yearofAssesment, fullName, Dimension4 } = req.body;
        var updatedApp = null;
        
        Dimension4.feedbackMarks.E = parseInt(Dimension4.feedbackMarks.A) + parseInt(Dimension4.feedbackMarks.B) + parseInt(Dimension4.feedbackMarks.C);
        Dimension4.confidentialReport.perceptionMarks = Dimension4.feedbackMarks.E * Dimension4.confidentialReport.principalRemarks;

        const existingFaculty = await Appraisal.findOne({
            facultyName: fullName,
            yearofAssesment: yearofAssesment,
        });

        if (existingFaculty) {
            updatedApp = await Appraisal.findOneAndUpdate(
                { _id: existingFaculty._id },
                { $set: { Dimension4: Dimension4, principalReviewed: true } }
            );
        } else {
            return res.status(404).json("Faculty Not Found In setDim4")
        }

        updatedApp = await Appraisal.findOne(
            { _id: existingFaculty._id }
        )
       
        updatedApp.finalGrandTotal.dimension1.totalMarks = updatedApp.Dimension1.totalMarks;
        updatedApp.finalGrandTotal.dimension2.totalMarks = updatedApp.Dimension2.totalMarks;
        updatedApp.finalGrandTotal.dimension3.totalMarks = updatedApp.Dimension3.totalMarks;
        updatedApp.finalGrandTotal.dimension4.totalMarks = updatedApp.Dimension4.confidentialReport.perceptionMarks;

        updatedApp.finalGrandTotal.dimension1.finalMarks = updatedApp.finalGrandTotal.dimension1.totalMarks * updatedApp.finalGrandTotal.dimension1.multiplyingFactor;
        updatedApp.finalGrandTotal.dimension2.finalMarks = updatedApp.finalGrandTotal.dimension2.totalMarks * updatedApp.finalGrandTotal.dimension2.multiplyingFactor;
        updatedApp.finalGrandTotal.dimension3.finalMarks = updatedApp.finalGrandTotal.dimension3.totalMarks * updatedApp.finalGrandTotal.dimension3.multiplyingFactor;
        updatedApp.finalGrandTotal.dimension4.finalMarks = updatedApp.finalGrandTotal.dimension4.totalMarks * updatedApp.finalGrandTotal.dimension4.multiplyingFactor;

        updatedApp.finalGrandTotal.GrandTotal = updatedApp.finalGrandTotal.dimension1.finalMarks + updatedApp.finalGrandTotal.dimension2.finalMarks + updatedApp.finalGrandTotal.dimension3.finalMarks + updatedApp.finalGrandTotal.dimension4.finalMarks;
        updatedApp.finalGrandTotal.GrandTotal = updatedApp.finalGrandTotal.GrandTotal + updatedApp.Dimension4.confidentialReport.bonusMarks
        if (updatedApp.finalGrandTotal.GrandTotal > 100) {
            updatedApp.finalGrandTotal.GrandTotal = 100
        }
        
        updatedApp = await Appraisal.findOneAndUpdate(
            { _id: existingFaculty._id },
            { $set: { finalGrandTotal: updatedApp.finalGrandTotal } }
        );
        res.status(200).json(updatedApp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
    setDim4HOD,
    setDim4Principal,
    getDim4,
    getAppraisal,
    getAllAppraisal,
    isSubmittedTeacher,
    setHodComments,
    getHodComments,
    getAllHODAppraisal,
    principalSubmit
}