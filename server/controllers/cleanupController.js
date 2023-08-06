const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Announcement = require('../models/announcements')
const Student = require('../models/student');
const Faculty = require('../models/faculty');

exports.cleanupAnnouncements = asyncHandler(async () => {
  const currentDate = new Date();

  // Step 1: Find announcement IDs with an endDate less than the current date
  const expiredAnnouncements = await Announcement.find(
    { endDate: { $lt: currentDate } },
    '_id'
  );

  // Step 2: Update student documents to remove expired announcements
  await Student.updateMany(
    { announcements: { $in: expiredAnnouncements.map((announcement) => announcement._id) } },
    { $pull: { announcements: { $in: expiredAnnouncements.map((announcement) => announcement._id) } } }
  );
  await Faculty.updateMany(
    { announcements: { $in: expiredAnnouncements.map((announcement) => announcement._id) } },
    { $pull: { announcements: { $in: expiredAnnouncements.map((announcement) => announcement._id) } } }
  );

  // Step 3: Delete expired announcements from the Announcement collection
  await Announcement.deleteMany({ endDate: { $lt: currentDate } });
});


exports.cleanupExams = asyncHandler(async () => {
    const currentDate = new Date();
  
    // Find students with exams that have passed the current date
    const studentsWithExpiredExams = await Student.find({
      'exams.date': { $lt: currentDate }
    });
  
    // Find faculty with exams that have passed the current date
    const facultyWithExpiredExams = await Faculty.find({
      'upcomingExams.date': { $lt: currentDate }
    });
    // Update the 'exams' array for each student to remove the expired exams
    const studentUpdateOperations = studentsWithExpiredExams.map((student) => {
      const updatedExams = student.exams.filter((exam) => exam.date >= currentDate);
      return Student.updateOne({ _id: student._id }, { $set: { exams: updatedExams } });
    });
  
    // Update the 'exams' array for each faculty member to remove the expired exams
    const facultyUpdateOperations = facultyWithExpiredExams.map((faculty) => {
      const updatedExams = faculty.upcomingExams.filter((exam) => exam.date >= currentDate);
      return Faculty.updateOne({ _id: faculty._id }, { $set: { upcomingExams: updatedExams } });
    });
  
    // Execute all the update operations in bulk
    await Promise.all([...studentUpdateOperations, ...facultyUpdateOperations]);
  });
  