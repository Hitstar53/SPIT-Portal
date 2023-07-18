const asyncHandler = require('express-async-handler');
const Student = require('../models/student.js');
const Placement = require('../models/placement.js');

exports.getProfessionalInfo = asyncHandler(async(req,res) => {
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
        studentname: student.name,
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
      let students;
      if (organization) {
        students = await Student.find({ 'internship.organization': { $regex: new RegExp(organization, 'i') } }).select('name uid emailID internship.organization');
      } else {
        students = await Student.find({ 'internship.0': { $exists: true } }).select('name uid emailID internship.organization');
      }
      const result = students.map((student) => ({
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        Organization: student.internship.map((internship) => internship.organization).join(', ') || '',
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
      const internshipFilter = { 'internship.0': { $exists: true } };
      if (organization) {
        placementFilter.companyName = { $regex: new RegExp(organization, 'i') };
        internshipFilter['internship.organization'] = { $regex: new RegExp(organization, 'i') };
      }

      const placementStudents = await Placement.find(placementFilter).select('emailID companyName ctc');
      const placementEmailIDs = placementStudents.map((placement) => placement.emailID);

      const internshipStudents = await Student.find(internshipFilter).select('uid name emailID internship.organization');

      const placementResult = placementStudents.map((placementStudent) => ({
        studentname: '',
        email: placementStudent.emailID,
        Organization: placementStudent.companyName,
        ctc: placementStudent.ctc,
      }));

      const internshipResult = internshipStudents.map((internshipStudent) => ({
        uid: internshipStudent.uid,
        studentname: internshipStudent.name,
        email: internshipStudent.emailID,
        ctc: '',
        Organization: internshipStudent.internship.map((internship) => internship.organization).join(', ') || ''
        }));


      const studentResult = await Student.find({ emailID: { $in: placementEmailIDs } }).select('uid name emailID');

      const result = [...placementResult, ...internshipResult].map((item) => {
        const student = studentResult.find((s) => s.emailID === item.email);
        if (student) {
          item.studentname = student.name;
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
    domain: ['$or', 'projects.domain', 'research.domain'],
    techStack: ['$or', 'projects.techStack', 'research.techStack'],
  };
  const filter = {};
  for (const field in fieldMapping) {
    if (req.body[field] !== undefined) {
      const schemaFields = fieldMapping[field];
      if (schemaFields[0] === '$or') {
        filter[schemaFields[0]] = filter[schemaFields[0]] || [];
        if (field === 'domain' && domain !== undefined) {
          filter[schemaFields[0]].push(
            ...schemaFields.slice(1).map((field) => ({
              [field]: {
                $regex: `${domain}`,
                $options: 'i',
              },
            }))
          );
        } else if (field === 'techStack' && techStack !== undefined) {
          filter[schemaFields[0]].push(
            ...schemaFields.slice(1).map((field) => ({
              [field]: {
                $regex: `${techStack}`,
                $options: 'i',
              },
            }))
          );
        } else {
          filter[schemaFields[0]].push(
            ...schemaFields.slice(1).map((field) => ({
              [field]: {
                $regex: `${req.body[field]}`,
                $options: 'i',
              },
            }))
          );
        }
      } else {
        filter[schemaFields] = {
          $regex: `${req.body[field]}`,
          $options: 'i',
        };
      }
    }
  }
  try {
    const response = await Student.find(filter).select(
      'uid name emailID projects.name projects.domain projects.techStack research.name research.domain research.techStack -_id'
    );
    let projectInfo = [];
    for (const res in response) {
      const { uid, name, emailID, projects, research } = response[res];
      for (const p in projects) {
        const project = projects[p].name;
        const domain = projects[p].domain;
        const techStack = projects[p].techStack.join(',');
        projectInfo.push({
          uid: uid,
          studentname: name,
          email: emailID,
          title: project,
          domain: domain,
          techstack: techStack,
          type: 'Project',
        });
      }
      for (const r in research) {
        const project = research[r].name;
        const domain = research[r].domain;
        const techStack = research[r].techStack.join(',');
        projectInfo.push({
          uid: uid,
          studentname: name,
          email: emailID,
          title: project,
          domain: domain,
          techstack: techStack,
          type: 'Research',
        });
      }
    }
    if (domain) {
      const domainRegex = new RegExp(domain, 'i');
      projectInfo = projectInfo.filter((item) =>
      domainRegex.test(item.domain)
      );
    }
    if (techStack) {
      const techStackRegex = new RegExp(techStack, 'i');
      projectInfo = projectInfo.filter((item) =>
      techStackRegex.test(item.techstack)
      );
    }
    res.json(projectInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.getInformation = asyncHandler(async (req, res) => {
  const { year, branch, batch, committee, event, cgpa } = req.body;

  const fieldMapping = {
    year: 'educationalInfo.0.year',
    branch: 'educationalInfo.0.branch',
    batch: 'educationalInfo.0.batch',
    committee: 'committee.committeeDetails',
    event: 'participation.eventName',
    cgpa: 'educationalInfo.0.score',
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
      'uid name emailID educationalInfo committee participation -_id'
    );
    const studentInfo = response.map((student) => {
      const educationalInfo = student.educationalInfo[0];
      let committeeNames =''
      if(student.committee.length>0){
        committeeNames = student.committee.map((committee) => committee.committeeDetails).join(', ');
      }

      let participationDescription =  '';
      if(student.participation.length>0){
        participationDescription = student.participation.map((participation) => participation.eventName).join(', ');
      }
      return {
        uid: student.uid,
        studentname: student.name,
        email: student.emailID,
        year: educationalInfo ? educationalInfo.year : '',
        branch: educationalInfo ? educationalInfo.branch : '',
        batch: educationalInfo ? educationalInfo.batch : '',
        committee: committeeNames,
        event: participationDescription,
        cgpa: educationalInfo ? educationalInfo.score : '',
      };
    });

    res.json(studentInfo);
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