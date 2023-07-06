const express = require('express')
const router = express.Router()

const announcementRouter = require('../controllers/announcementsController');
router.put('/setAnnouncementsAllStudents',announcementRouter.setAnnouncementsAllStudents);
router.put('/setAnnouncementsGroupStudents',announcementRouter.setAnnouncementsGroupStudents);
router.put('/setAnnouncementsSpecificStudents',announcementRouter.setAnnouncementsSpecificStudents);
router.put('/getStudentAnnouncements',announcementRouter.getStudentAnnouncements);
router.put('/getFacultyAnnouncements',announcementRouter.getFacultyAnnouncements);

module.exports = router;