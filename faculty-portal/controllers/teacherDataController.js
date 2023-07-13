const asyncHandler = require('express-async-handler');
const Faculty = require('../models/faculty.js')
const Appraisal = require('../models/appraisal.js')
const { error } = require("console");

exports.getFaculty = asyncHandler(async (req, res) => {
    console.log("Inside getFaculty");
    const faculties = await Faculty.findById(req.params.id);
    res.status(200).json(faculties);
})

exports.setFaculty = asyncHandler(async (req, res) => {

})

exports.updateFaculty = asyncHandler(async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
        var facultyDetails = await Faculty.updateOne({ email: email }, req.body);
        var newDet = await Faculty.findOne({ email: email });
        console.log(newDet);
        res.status(200).json(newDet);
    }
    catch (err) {
        console.log(err);
        res.status(504).send(err);
    }
})

exports.retrieveFacultyCourses = asyncHandler(async (req, res) => {
    const email = req.body.email;
    try {
        const det = await Faculty.findOne({ email: email });
        det.courses = det.history.pop();
        const newDet = await Faculty.updateOne({ email: email }, det);
        res.status(200).send(newDet);
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }
})

exports.deleteCourses = asyncHandler(async (req, res) => {
    const email = req.body.email;
    try {
        const faculty = await Faculty.findOne({ email });
        faculty.history.push(faculty.courses);
        faculty.courses = [];

        const det = await Faculty.updateOne({ email: email },
            faculty
        );
        res.status(200).send("Removed details");
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }

})

exports.loginFaculty = async (req, res) => {
    const { email } = req.body;
    const det = await Faculty.findOne({ email: email })
    if (det) {
        res.status(200).send(det)
    } else {
        res.status(404).send("NO data found")
    }
}

exports.getEvent = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const det = await Faculty.findOne({ email: email })
        if (!det) {
            return res.status(404).send('User not found');
        }
        const events = det.events
        // const events = {
        //     title: det.events.title,
        //     startDate: det.events.startDate,
        //     endDate: det.events.endDate
        // }
        // console.log(events);
        const allEvents = []
        events.map((event) => {
            allEvents.push({
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                _id: event._id
            })
        })
        console.log(allEvents)
        res.status(200).send(allEvents);
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }
})

exports.addEvent = asyncHandler(async (req, res) => {
    const { email, events } = req.body;
    console.log(req.body)
    try {
        const det = await Faculty.updateOne({ email: email }, {
            $push: {
                events: events
            }
        })
        const faculty = await Faculty.findOne({ email: email });
        // console.log(faculty.events);
        const allEvents = []
        faculty.events.map((event) => {
            allEvents.push({
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                _id: event._id
            })
        })
        console.log(allEvents)
        res.status(200).send(allEvents);
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }
})

exports.deleteEvent = asyncHandler(async (req, res) => {
    const { email, id } = req.body;
    console.log(req.body)
    try {
        const det = await Faculty.updateOne({ email: email }, {
            $pull: {
                events: {
                    _id: id
                }
            }
        })
        const faculty = await Faculty.findOne({ email: email });
        console.log(faculty.events);
        res.send("Deleted");
    } catch (err) {
        console.log(err);
        res.status(504).send("Internal Server Error");
    }
})

exports.getFacultyByDept = asyncHandler(async (req, res) => {
    console.log("Inside for the HODappraisal")
    const { name, year } = req.body
    try {
        const { department } = req.body
        const facultyInfo = await Faculty.find({
            department
        }, { fullName: 1 })

        if (facultyInfo) {
            console.log(facultyInfo)
            const faculty = []
            facultyInfo.map((info) => {
                faculty.push(
                    info.fullName
                )
            })
            console.log(faculty)
            return res.status(200).json(faculty)
        }
        else {
            return res.status(404)
        }
    } catch (error) {
        console.log(error)
    }
})

exports.getFacultyByDeptHOD = asyncHandler(async (req, res) => {
    console.log("Inside for the HODappraisal")
    try {
        const { department,yearofAssesment } = req.body
        const facultyInfo = await Appraisal.find({
            yearofAssesment,
            department,
            isSubmitted:true
        }, { facultyName: 1 })

        if (facultyInfo) {
            console.log(facultyInfo)
            const faculty = []
            facultyInfo.map((info) => {
                // console.log(info)
                faculty.push(
                    info.facultyName
                )
            })
            console.log(faculty)
            return res.status(200).json(faculty)
        }
        else {
            return res.status(404)
        }
    } catch (error) {
        console.log(error)
    }
})

exports.getAllFaculty = asyncHandler(async (req, res) => {
    try {
        const facultyInfo = await Faculty.find({}, { fullName: 1 })
        if (facultyInfo) {
            console.log(facultyInfo)
            const faculty = []
            facultyInfo.map((info) => {
                if (info.fullName || info.fullName === NaN) {
                    faculty.push(
                        info.fullName
                    )
                }
            })
            console.log(faculty)
            return res.status(200).json(faculty)
        }
        else {
            return res.status(404)
        }
    } catch (error) {
        console.log(error)
    }
})

exports.getPrincipalFaculty = asyncHandler(async (req, res) => {
    try {
        const { year } = req.body
        // console.log(year)
        const appraisal = await Appraisal.find({ yearofAssesment: year, isSubmitted: true, HODReviewed: true, principalReviewed: false })
        // console.log(appraisal)
        if (appraisal) {
            const faculty = []
            appraisal.map((info) => {
                faculty.push(
                    info.facultyName
                )
            })
            console.log(faculty)
            return res.status(200).json(faculty)
        }
        else {
            return res.status(404).json("No faculty found")
        }
    } catch (error) {
        console.log(error)
    }
})


exports.checkFaculty = async (req, res) => {
    const { name, year } = req.body
    try {
        const faculty = await Faculty.findOne({ fullName: name })
        if (faculty) {
            const appraisal = await Appraisal.findOne({ facultyName: name, yearofAssesment: year })
            if (appraisal.isSubmitted && !appraisal.HODReviewed) return res.status(200).json("Faculty has submmitted the appraisal")
            else return res.status(400).json("Faculty has not submmitted the appraisal")
        }
        else {
            return res.status(404).json("Faculty has not found")
        }
    } catch (err) {
        console.log(err)
        return res.status(504)
    }
}

exports.principalAppraisal = async (req, res) => {
    const { name, year } = req.body
    console.log(name, year)
    try {
        const faculty = await Faculty.findOne({ fullName: name })
        if (faculty) {
            const appraisal = await Appraisal.findOne({ facultyName: name, yearofAssesment: year })
            // console.log(appraisal)
            res.status(200).json(appraisal)
        }
        else {
            return res.status(404).json(false)
        }
    } catch (err) {
        console.log(err)
        return res.status(504)
    }
}
