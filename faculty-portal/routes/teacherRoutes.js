const express = require("express");
const router = express.Router();
const teacherDataController = require('../controllers/teacherDataController');

router.post('/', teacherDataController.setFaculty);
router.post('/update', teacherDataController.updateFaculty);
router.delete('/delete/course', teacherDataController.deleteCourses);
router.delete('/retrieve/course', teacherDataController.retrieveFacultyCourses);
router.post('/login', teacherDataController.loginFaculty)
router.post('/get/event', teacherDataController.getEvent)
router.post('/add/event', teacherDataController.addEvent)
router.post('/delete/event', teacherDataController.deleteEvent)
router.post('/get/faculty/by-dept', teacherDataController.getFacultyByDept)
router.post('/get/faculty/all', teacherDataController.getAllFaculty)
module.exports = router; 