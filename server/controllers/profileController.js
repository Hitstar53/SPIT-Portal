const asyncHandler = require('express-async-handler')
const Profile = require('../models/student');
const Photo = require("../models/photo");
const Faculty = require('../models/faculty')
exports.updatePersonalInfo = asyncHandler(async(req,res) =>{
        const phone = req.body.phone;
        const address = req.body.address;
        const dob = new Date(req.body.dob);
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
                    res.status(400).json(error)

        }
})
exports.updateProfilePic = asyncHandler(async(req,res) => {
        const photo = req.body.photo;
        const email = req.body.email;
        try {
            await Photo.findOneAndUpdate({emailID:email},{$set:{photoURI:photo}},{upsert:true})
            res.status(200).json('Profile Picture updated Succesfully')
        } catch (error) {
                    res.status(400).json(error)

        }
})

exports.updateParentalInfo = asyncHandler(async(req,res) =>{
    const fatherName = req.body.fname;
    const motherName = req.body.mname;
    const fatherPhoneNo = req.body.fphone;
    const motherPhoneNo = req.body.mphone;
    const fatherEmailID = req.body.femail;
    const motherEmailID = req.body.memail;
    const fprofession = req.body.fprofession;
    const mprofession = req.body.mprofession;
    const email = req.body.email;
    if (!email) {
        res.status(404).send("Send email")
        return;
    }
    try {
        await Profile.findOneAndUpdate({emailID:email},{$set: {fname:fatherName,mname:motherName,fphone:fatherPhoneNo,mphone:motherPhoneNo,femail:fatherEmailID,memail:motherEmailID,fprofession:fprofession,mprofession:mprofession}},{upsert:true})
        res.status(200).json(' Parental Profile updated Succesfully')
    } catch (error) {
                res.status(400).json(error)

    }
})

exports.updateEducationalInfo = asyncHandler(async(req,res) =>{
    const eduInfo = req.body.eduInfo
    const index = req.body.index
    const email = req.body.email;
    try {
        const student = await Profile.findOne({emailID:email})
        if (index===0) {
            const onGoingSemester = eduInfo.semester
            const semester = student.semester
            semester.forEach(element => {
                if (element.semesterNumber < onGoingSemester) {
                    element.status = "Completed"
                }
                else if(element.semesterNumber > onGoingSemester){
                    element.status = "Not Started"
                }
                else{
                    element.status = "Ongoing"
                }
            });
        }
        student.educationalInfo[index] = eduInfo
        await student.save()
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
                res.status(400).json(error)

    }
})

exports.getParentalInfo = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    
    try {
        const profile = await Profile.findOne({emailID:email}).select("fname mname mphone fphone memail femail fprofession mprofession -_id")
        res.status(200).json(profile)
    } catch (error) {
                res.status(400).json(error)

    }
})

exports.getEduInfo = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const profile = await Profile.findOne({emailID:email}).select("educationalInfo -_id")
        res.status(200).json(profile)
    } catch (error) {
                res.status(400).json(error)

    }
})

exports.getMiniDrawer = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const photo = await Photo.findOne({emailID:email}).select("photoURI -_id")
        const {uid,name} = await Profile.findOne({emailID:email}).select("uid name -_id")
        res.status(200).json({photo:photo.photoURI,uid:uid,name:name})
    } catch (error) {
                res.status(400).json(error)

    }
})

exports.getExams = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const exams = await Profile.findOne({emailID:email}).select("exams -_id")
        res.status(200).json(exams)
    } catch (error) {
                res.status(400).json(error)

    }
})

exports.getSemesters = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    try {
        const semesters = await Profile.findOne({ emailID: email }).select(
          "semester.semesterNumber semester.sgpa semester.status semester.academicYear educationalInfo -_id"
        );
        res.status(200).json({semester:semesters.semester})
    } catch (error) {
                res.status(400).json(error)

    }
}
)

exports.getResults = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    const semesterNumber = req.body.semesterNumber;
    try {
        const sem = await Profile.findOne({emailID:email}).select('semester educationalInfo -_id')
        const academicYear = sem.semester[semesterNumber-1].academicYear
        const results = (sem.semester[semesterNumber-1].courses)
        res.status(200).json({results:results,academicYear})
    }
    catch (error){
                res.status(400).json(error)

    }
})

exports.updateUpcomingExams = asyncHandler(async(req,res) =>{
    const email = req.body.email;
    const date = req.body.date;
    const type = req.body.type;
    const syllabus = req.body.syllabus;
    const courseName = req.body.courseName;
    try {
        
        await Profile.updateMany({},{$push:{exams:{date:date,type:type,syllabus:syllabus,courseName:courseName}}})
        await Faculty.updateOne({emailID:email},{$push:{upcomingExams:{date:date,type:type,syllabus:syllabus,courseName:courseName}}})
        res.status(200).json("exam announcements updated")
    }  catch (error) {
                res.status(400).json(error)

    }
})

exports.updateGroupUpcomingExams = asyncHandler(async(req,res) =>{
    const email = req.body.email;
    const year = req.body.year;
    const division = req.body.division;
    const branch = req.body.branch;
    const date = new Date(req.body.date);
    const type = req.body.type;
    const syllabus = req.body.syllabus;
    const courseName = req.body.courseName;
    const batch = req.body.batch
    if(batch)
    {
        const sendTo = `${year} ${branch} ${division} Batch: ${batch}`
        try {
            await Profile.updateMany({"educationalInfo.0.year":year,"educationalInfo.0.branch":branch,"educationalInfo.0.division":division,"educationalInfo.0.batch":batch},{$push:{exams:{date:date,type:type,syllabus:syllabus,courseName:courseName}}})
            await Faculty.updateOne({emailID:email},{$push:{upcomingExams:{date:date,type:type,syllabus:syllabus,courseName:courseName,sendTo:sendTo}}})
            res.status(200).json("exam announcements updated")
        }  catch (error) {
                    res.status(400).json(error)

        }
    }
    else{
        const sendTo = `${year} ${branch} ${division}`
        try {
            await Profile.updateMany({"educationalInfo.0.year":year,"educationalInfo.0.branch":branch,"educationalInfo.0.division":division},{$push:{exams:{date:date,type:type,syllabus:syllabus,courseName:courseName}}})
            await Faculty.updateOne({emailID:email},{$push:{upcomingExams:{date:date,type:type,syllabus:syllabus,courseName:courseName,sendTo:sendTo}}})
            res.status(200).json("exam announcements updated")
        }  catch (error) {
                    res.status(400).json(error)

        }
    }

})
exports.getUpcomingExams = asyncHandler(async(req,res) => {
    const email = req.body.email;
    try {
        const examStudent = await Profile.findOne({emailID:email}).select('exams.date exams.syllabus exams.type exams.courseName -_id')
        examStudent.exams.sort((a, b) => new Date(a.date) - new Date(b.date));
        res.status(200).json(examStudent)
    }
    catch (error){
                res.status(400).json(error)

    }
})

exports.updateUID = asyncHandler(async(req,res)=>{
    const email = req.body.email
    const uid = req.body.uid;
    try{
        await Profile.updateOne({emailID:email},{uid:uid})
        res.status(200).json("UID updated successfully")
    }catch(error){
                res.status(400).json(error)

    }
})