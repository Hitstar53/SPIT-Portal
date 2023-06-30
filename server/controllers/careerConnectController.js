const asyncHandler = require('express-async-handler')
const Student = require('../models/student');
const Placement = require('../models/placement');
exports.setInternship = asyncHandler(async(req,res) =>{
    const organization = req.body.organization
    const position = req.body.position
    const duration = req.body.duration
    const financed = req.body.financed
    const mode = req.body.mode
    const description = req.body.description
    const email = req.body.email
    try {
        const profile = await Student.findOne({emailID:email})
        profile.internship.unshift({organization:organization,position:position,duration:duration,mode:mode,description:description,financed:financed})
        await profile.save()
        res.status(200).json("Internship added succesfully")
    }catch (error) {
        console.error(error)
    }
})
exports.deleteInternships = asyncHandler(async(req,res)=>{
    try {
        const internships = req.body.internships
        const email = req.body.email
        await Student.findOneAndUpdate({emailID:email},{$set:{internship:internships}})
        res.status(200).json('Your Internship deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.getInternships = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try {
        const internships = await Student.findOne({emailID:email}).select('internship -_id')
        res.status(200).json(internships)    
    } catch (error) {
        console.error(error)
    }
})

exports.setProjects = asyncHandler(async(req,res) =>{
    const name = req.body.name
    const duration = req.body.duration
    const domain = req.body.domain
    const techStack = req.body.techStack
    const team = req.body.team
    const description = req.body.description
    const email = req.body.email
    try {
        const profile = await Student.findOne({emailID:email})
        profile.projects.unshift({name:name,duration:duration,domain:domain,techStack:techStack,team:team,description:description})
        await profile.save()
        res.status(200).json('Your Project Added Succesfully')
    } catch (error) {
        console.error(error)
    }
})
exports.deleteProjects = asyncHandler(async(req,res)=>{
    try {
        const projects = req.body.projects
        const email = req.body.email
        await Student.findOneAndUpdate({emailID:email},{$set:{projects:projects}})
        res.status(200).json('Your Project deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.getProjects = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try {
        const projects = await Student.findOne({emailID:email}).select('projects -_id')
        res.status(200).json(projects)    
    } catch (error) {
        console.error(error)
    }
})

exports.setResearch = asyncHandler(async(req,res) =>{
    const name = req.body.name
    const duration = req.body.duration
    const domain = req.body.domain
    const techStack = req.body.techStack
    const mentor = req.body.mentor
    const description = req.body.description
    const email = req.body.email
    try {
        const profile = await Student.findOne({emailID:email})
        profile.research.unshift({name:name,duration:duration,domain:domain,techStack:techStack,mentor:mentor,description:description})
        await profile.save()
        res.status(200).json('Your Research Added Succesfully')
    } catch (error) {
        console.error(error)
    }
})
exports.deleteResearch = asyncHandler(async(req,res)=>{
    try {
        const research = req.body.research
        const email = req.body.email
        await Student.findOneAndUpdate({emailID:email},{$set:{research:research}})
        res.status(200).json('Your Research deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.getResearch = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try {
        const research = await Student.findOne({emailID:email}).select('research -_id')
        res.status(200).json(research)    
    } catch (error) {
        console.error(error)
    }
})

exports.setSkills = asyncHandler(async(req,res) =>{
    const skill = req.body.skill
    const email = req.body.email
    try {
        const profile = await Student.findOne({emailID:email})
        profile.skills.push(skill)
        await profile.save()
        res.status(200).json('Your Skill Added Succesfully')
    } catch (error) {
        console.error(error)
    }
})
exports.deleteSkills = asyncHandler(async(req,res) =>{
    const skills = req.body.skill
    const email = req.body.email
    try {
        await Student.findOneAndUpdate({emailID:email},{$set:{skills:skills}})
        res.status(200).json('Your Skill deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.getSkills = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try {
        const skills  = await Student.findOne({emailID:email}).select('skills -_id')
        res.status(200).json(skills)    
    } catch (error) {
        console.error(error)
    }
})

exports.updatePlacement = asyncHandler(async(req,res)=>{
    const companyName = req.body.companyName
    const contactNo = req.body.contactNo
    const address = req.body.address
    const role = req.body.role
    const description = req.body.description
    const doj = req.body.doj
    const ctc = req.body.ctc
    const email = req.body.email
    try{
        await Placement.findOneAndUpdate({emailID:email},{
            $set:{
                companyName:companyName,
                contactNo:contactNo,
                address:address,
                role:role,
                description:description,
                doj:doj,
                ctc:ctc,
            }
        },{upsert:true})
        res.status(200).json("Updated Placement Succesfully")
    }
    catch(error){
        console.error(error)
    }
})

exports.getPlacement = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try {
        const placement  = await Placement.findOne({emailID:email}).select('-_id')
        res.status(200).json(placement)   
    } catch (error) {
        console.error(error)
    }
})