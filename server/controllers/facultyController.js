const asyncHandler = require('express-async-handler');
const Faculty = require('../models/faculty');

exports.getFaculty = asyncHandler(async (req, res) => {
    emailID = req.body.email;
    try {
        const faculty = await Faculty.findOne({emailID: emailID}).select('name announcements -_id');
        res.status(200).json(faculty);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});
