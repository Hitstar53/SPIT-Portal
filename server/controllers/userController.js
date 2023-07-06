const asyncHandler = require('express-async-handler');
const User = require('../models/users');
exports.getUsers = asyncHandler(async (req, res) => {
    const email = req.body.email;
    try {
        const users = await User.findOne({emailID: email}).select('role -_id');
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});
