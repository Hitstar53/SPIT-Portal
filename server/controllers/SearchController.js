const asyncHandler = require('express-async-handler');
const Student = require('../models/student.js');
const Placement = require('../models/placement.js');

exports.getProfessionalInfo = asyncHandler(async(req,res) => {
    // const organization = req.body.organization;
    // const type = req.body.type;
    // const ctc = req.body.ctc;
    // try{ 
        // if(type === "All")
        // {
        //     if(organization && ctc)
        //     {
        //         const placementEmails = await Placement.find({ ctc:ctc,companyName:organization}, 'emailID -_id').sort('emailID');
        //         const emailIDs = placementEmails.map(placement => placement.emailID);
        //         const studentsPlacement = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
        //         const studentsInternship = await Student.find({internship:{$elemMatch:{organization:organization}}},'emailID name uid -_id').sort('emailID')
        //         res.status(200).json({studentsPlacement,studentsInternship,placementEmails})
        //     }
        //     else if(organization)
        //     {
        //         const placementEmails = await Placement.find({companyName:organization}, 'emailID ctc -_id').sort('emailID');
        //         const emailIDs = placementEmails.map(placement => placement.emailID);
        //         const studentsPlacement = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
        //         const studentsInternship = await Student.find({internship:{$elemMatch:{organization:organization}}},'emailID name uid -_id').sort('emailID')
        //         res.status(200).json({studentsPlacement,studentsInternship,placementEmails})
        //     }
        //     else if(ctc)
        //     {
        //         const placementEmails = await Placement.find({ctc:ctc}, 'emailID companyName -_id').sort('emailID');
        //         const emailIDs = placementEmails.map(placement => placement.emailID);
        //         const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
        //         res.status(200).json({placementEmails,students})
        //     }
        //     else{
        //         const placementEmails = await Placement.find({'companyName':{'$ne':'-'}}, 'emailID companyName ctc -_id').sort('emailID');
        //         const emailIDs = placementEmails.map(placement => placement.emailID);
        //         const studentsPlacement = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
        //         const studentsInternship = await Student.find({'internship.0':{$exists:true}},'emailID name uid internship.organization -_id').sort('emailID')
        //         res.status(200).json({studentsInternship,studentsPlacement,placementEmails})
        //     }
        // }
        // else if(type === "Placement")
        // {
        //     if(ctc && organization)
        //     {
        //         const placementEmails = await Placement.find({ ctc:ctc,companyName:organization}, 'emailID -_id').sort('emailID');
        //         const emailIDs = placementEmails.map(placement => placement.emailID);
        //         const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID')
        //         res.status(200).json(students)
        //     }
        //     else if(organization){
        //         const placementEmails = await Placement.find({companyName:organization}, 'emailID ctc -_id').sort('emailID');
        //         const emailIDs = placementEmails.map(placement => placement.emailID);
        //         const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
        //         res.status(200).json({placementEmails,students})
        //     }
        //     else if(ctc){
        //         const placementEmails = await Placement.find({ctc:ctc}, 'emailID companyName -_id').sort('emailID');
        //         const emailIDs = placementEmails.map(placement => placement.emailID);
        //         const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
        //         res.status(200).json({placementEmails,students})
        //     }
        //     else{
        //         const placementEmails = await Placement.find({'companyName':{'$ne':'-'}}, 'emailID companyName ctc -_id').sort('emailID');
        //         const emailIDs = placementEmails.map(placement => placement.emailID);
        //         const students = await Student.find({ emailID: { $in: emailIDs } }, 'emailID name uid -_id').sort('emailID');
        //         res.status(200).json({placementEmails,students})
        //     }
        // }
        // else{
        //     if(organization){
        //         const students = await Student.find({internship:{$elemMatch:{organization:organization}}},'emailID name uid -_id')
        //         res.status(200).json(students)
        //     }
        //     else{
        //         const students = await Student.find({'internship.0':{$exists:true}},'emailID name uid internship.organization -_id')
        //         res.status(200).json(students)
        //     }
        // }
        
    // }
    // catch(error){
    //     console.error(error)
    // }
    const { type, organization, ctc } = req.body;

  if (type === 'Placement') {
    const filter = {};
    if (organization) filter.companyName = { $regex: new RegExp(organization, 'i') };
    if (ctc) filter.ctc = { $regex: new RegExp(ctc, 'i') };

    try {
      const placements = await Placement.find(filter).select('emailID companyName ctc');
      const emailIDs = placements.map((placement) => placement.emailID);

      const students = await Student.find({ emailID: { $in: emailIDs } }).select('uid name emailID');
      const result = students.map((student) => ({
        uid: student.uid,
        name: student.name,
        email: student.emailID,
        Organization: placements.find((placement) => placement.emailID === student.emailID)?.companyName || '',
        ctc: placements.find((placement) => placement.emailID === student.emailID)?.ctc || '',
      }));

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (type === 'Internship') {
    try {
      const students = await Student.find({ 'internship.organization': { $regex: new RegExp(organization, 'i') } }).select('name uid emailID internship.organization');
      const result = students.map((student) => ({
        uid: student.uid,
        name: student.name,
        email: student.emailID,
        Organization: student.internship.find((internship) => internship.organization.toLowerCase() === organization.toLowerCase())?.organization || '',
        ctc: '',
      }));

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (type === 'All') {
    try {
      const placementFilter = {};
      const internshipFilter = {};
      if (organization) {
        placementFilter.companyName = { $regex: new RegExp(organization, 'i') };
        internshipFilter['internship.organization'] = { $regex: new RegExp(organization, 'i') };
      }

      const placementStudents = await Placement.find(placementFilter).select('emailID companyName ctc');
      const placementEmailIDs = placementStudents.map((placement) => placement.emailID);

      const internshipStudents = await Student.find(internshipFilter).select('uid name emailID internship.organization');

      const placementResult = placementStudents.map((placementStudent) => ({
        name: '',
        email: placementStudent.emailID,
        Organization: placementStudent.companyName,
        ctc: placementStudent.ctc,
      }));

      const internshipResult = internshipStudents.map((internshipStudent) => ({
        name: internshipStudent.name,
        email: internshipStudent.emailID,
        ctc: '',
        organization: internshipStudent.internship.find((internship) => internship.organization.toLowerCase() === organization.toLowerCase())?.organization || '',
      }));


      const studentResult = await Student.find({ emailID: { $in: placementEmailIDs } }).select('uid name emailID');

      const result = [...placementResult, ...internshipResult].map((item) => {
        const student = studentResult.find((s) => s.emailID === item.email);
        if (student) {
          item.name = student.name;
          item.uid = student.uid;
        }
        return item;
      });

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid type' });
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
  

  exports.getGeneralInfo = asyncHandler(async (req, res) => {
    const searchText = req.body.searchText;
  
    try {
      const response = await Student.find({
        $or: [
          { name: { $regex: searchText, $options: 'i' } },
          { emailID: { $regex: searchText, $options: 'i' } },
          { uid: parseInt(searchText) },
        ],
      }).select('uid name emailID -_id');
  
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });