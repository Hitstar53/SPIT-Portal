const asyncHandler = require('express-async-handler');
const Student = require('../models/student.js');
const Placement = require('../models/placement.js');

exports.getProfessionalInfo = asyncHandler(async(req,res) => {
    const organization = req.body.organization;
    const type = req.body.type;
    const ctc = req.body.ctc;
    try{ 
        if(type === "All")
        {
            if(organization && ctc)
            {
                const placementEmails = await Placement.find({ ctc:ctc,companyName:organization}, 'emailID -_id').sort('emailID');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const studentsPlacement = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
                const studentsInternship = await Student.find({internship:{$elemMatch:{organization:organization}}},'emailID name uid -_id').sort('emailID')
                res.status(200).json({studentsPlacement,studentsInternship,placementEmails})
            }
            else if(organization)
            {
                const placementEmails = await Placement.find({companyName:organization}, 'emailID ctc -_id').sort('emailID');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const studentsPlacement = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
                const studentsInternship = await Student.find({internship:{$elemMatch:{organization:organization}}},'emailID name uid -_id').sort('emailID')
                res.status(200).json({studentsPlacement,studentsInternship,placementEmails})
            }
            else if(ctc)
            {
                const placementEmails = await Placement.find({ctc:ctc}, 'emailID companyName -_id').sort('emailID');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
                res.status(200).json({placementEmails,students})
            }
            else{
                const placementEmails = await Placement.find({'companyName':{'$ne':'-'}}, 'emailID companyName ctc -_id').sort('emailID');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const studentsPlacement = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
                const studentsInternship = await Student.find({'internship.0':{$exists:true}},'emailID name uid internship.organization -_id').sort('emailID')
                res.status(200).json({studentsInternship,studentsPlacement,placementEmails})
            }
        }
        else if(type === "Placement")
        {
            if(ctc && organization)
            {
                const placementEmails = await Placement.find({ ctc:ctc,companyName:organization}, 'emailID -_id').sort('emailID');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID')
                res.status(200).json(students)
            }
            else if(organization){
                const placementEmails = await Placement.find({companyName:organization}, 'emailID ctc -_id').sort('emailID');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
                res.status(200).json({placementEmails,students})
            }
            else if(ctc){
                const placementEmails = await Placement.find({ctc:ctc}, 'emailID companyName -_id').sort('emailID');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
                res.status(200).json({placementEmails,students})
            }
            else{
                const placementEmails = await Placement.find({'companyName':{'$ne':'-'}}, 'emailID companyName ctc -_id').sort('emailID');
                const emailIDs = placementEmails.map(placement => placement.emailID);
                const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
                res.status(200).json({placementEmails,students})
            }
        }
        else{
            if(organization){
                const students = await Student.find({internship:{$elemMatch:{organization:organization}}},'emailID name uid -_id')
                res.status(200).json(students)
            }
            else{
                const students = await Student.find({'internship.0':{$exists:true}},'emailID name uid internship.organization -_id')
                res.status(200).json(students)
            }
        }
    }
    catch(error){
        console.error(error)
    }
})


exports.getProjectsInfo = asyncHandler(async (req, res) => {
    let { year, domain, techStack } = req.body;
    const fieldMapping = {
      year: 'educationalInfo.0.year',
      domain: 'projects.domain',
      techStack: 'projects.techStack',
    };
    const filter = {};
    for (const field in fieldMapping) {
      if (req.body[field] !== undefined) {
        const schemaField = fieldMapping[field];
        filter[schemaField] = {
            $regex: `${req.body[field]}`,
            $options: 'i',
        };
      }
    }
    try {
      const response = await Student.find(filter).select(
        'uid name emailID projects.name projects.domain projects.techStack -_id'
      );
      let projectInfo = [];
      for (const res in response) {
        const { uid, name, emailID, projects } = response[res];
        for (const p in projects) {
          const project = projects[p].name;
          const domain = projects[p].domain;
          const techStack = projects[p].techStack.join(',');
          projectInfo.push({
            uid: uid,
            studentname: name,
            email: emailID,
            project: project,
            domain: domain,
            techstack: techStack,
          });
        }
      }
      if (domain) {
        const domainRegex = new RegExp( domain , 'i');
        projectInfo = projectInfo.filter((item) => domainRegex.test(item.domain));
      }
      if (techStack) {
        const techStackRegex = new RegExp( techStack , 'i');
        projectInfo = projectInfo.filter((item) => techStackRegex.test(item.techstack));
      }
      res.json(projectInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  