const asyncHandler = require('express-async-handler')
const Profile = require('../models/student');
const Photo = require("../models/photo");
exports.updatePersonalInfo = asyncHandler(async(req,res) =>{
        const phone = req.body.phone;
        const address = req.body.address;
        const dob = req.body.dob;
        const gender = req.body.gender;
        const blood = req.body.blood;
        const religion = req.body.religion;
        const linkedin = req.body.linkedin;
        const github = req.body.github;
        const email = req.body.email;
        
        try {
            await Profile.findOneAndUpdate({emailID:email},{$set: {phone:phone,address:address,dob:dob,gender:gender,blood:blood,religion:religion,linkedin:linkedin,github:github}},{upsert:true})
            res.status(200).json(' Personal Profile updated Succesfully')
        } catch (error) {
            console.error(error)
        }
})
exports.updateProfilePic = asyncHandler(async(req,res) => {
        const photo = req.body.photo;
        try {
            await Photo.findOneAndUpdate({emailID:email},{$set:{photoURI:photo}},{upsert:true})
            res.status(200).json('Profile Picture updated Succesfully')
        } catch (error) {
            console.error(error)
        }
})

exports.updateParentalInfo = asyncHandler(async(req,res) =>{
    const fatherName = req.body.fatherName;
    const motherName = req.body.motherName;
    const fatherPhoneNo = req.body.fatherPhoneNo;
    const motherPhoneNo = req.body.motherPhoneNo;
    const fatherEmailID = req.body.fatherEmailID;
    const motherEmailID = req.body.motherEmailID;
    const email = req.body.email;
    if (!email) {
        res.status(404).send("Send email")
        return;
    }
    try {
        await Profile.findOneAndUpdate({emailID:email},{$set: {fatherName:fatherName,motherName:motherName,fatherPhoneNo:fatherPhoneNo,motherPhoneNo:motherPhoneNo,fatherEmailID:fatherEmailID,motherEmailID:motherEmailID}},{upsert:true})
        res.status(200).json(' Parental Profile updated Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.updateEducationalInfo = asyncHandler(async(req,res) =>{
    const eduInfo = req.body.eduInfo
    const email = req.body.email;
    try {
        await Profile.findOneAndUpdate({emailID:email},{$set:{educationalInfo:eduInfo}},{upsert:true})
        
        res.status(200).json("educational info submitted successfully")
    } catch (error) {
        console.log(error)
    }
})

exports.getPersonalInfo = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const profile = await Profile.findOne({emailID:email}).select("emailID phone address dob religion blood gender linkedin github -_id")
        res.status(200).json(profile)
    } catch (error) {
        console.error(error)
    }
})

exports.getParentalInfo = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const profile = await Profile.findOne({emailID:email}).select("fatherName motherName motherPhoneNo fatherPhoneNo motherEmailID fatherEmailID -_id")
        res.status(200).json(profile)
    } catch (error) {
        console.error(error)
    }
})

exports.getEduInfo = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const profile = await Profile.findOne({emailID:email}).select("educationalInfo -_id")
        res.status(200).json(profile)
    } catch (error) {
        console.error(error)
    }
})

exports.getMiniDrawer = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const photo = await Photo.findOne({emailID:email}).select("photoURI -_id")
        const {uid,name} = await Profile.findOne({emailID:email}).select("uid name -_id")
        res.status(200).json({photo:photo.photoURI,uid:uid,name:name})
    } catch (error) {
        console.error(error)
    }
})

exports.getExams = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const exams = await Profile.findOne({emailID:email}).select("exams -_id")
        res.status(200).json(exams)
    } catch (error) {
        console.error(error)
    }
})
