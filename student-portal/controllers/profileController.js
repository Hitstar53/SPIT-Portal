const asyncHandler = require('express-async-handler')
const Profile = require('../models/student');
const Photo = require("../models/photo");
exports.updatePersonalInfo = asyncHandler(async(req,res) =>{
        const phoneNo = req.body.phoneNo;
        const address = req.body.address;
        const dob = req.body.dob;
        const gender = req.body.gender;
        const bloodGroup = req.body.bloodGroup;
        const religion = req.body.religion;
        const linkedin = req.body.linkedin;
        const github = req.body.github;
        const email = req.body.email;
        try {
            await Profile.findOneAndUpdate({emailID:email},{$set: {phoneNo:phoneNo,address:address,dob:dob,gender:gender,bloodGroup:bloodGroup,religion:religion,linkedin:linkedin,github:github}},{upsert:true})
            res.status(200).json(' Personal Profile updated Succesfully')
        } catch (error) {
            console.error(error)
        }
})
exports.updateProfilePic = asyncHandler(async(req,res) => {
        const photo = req.body.photo;
        try {
            await Photo.findOneAndUpdate({emailID:email},{$set:{photoURI:photo}},{upsert:true})
            res.status(200).json(' Personal Profile updated Succesfully')
        } catch (error) {
            console.error(error)
        }
})
