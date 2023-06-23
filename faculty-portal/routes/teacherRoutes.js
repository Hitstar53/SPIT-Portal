const express = require("express");
const router = express.Router();
const teacherDataController = require('../controllers/teacherDataController');

router.post('/', teacherDataController.setFaculty);
router.post('/update', teacherDataController.updateFaculty);
router.delete('/delete/course', teacherDataController.deleteCourses);
router.delete('/retrieve/course', teacherDataController.retrieveFacultyCourses);
router.post('/login', teacherDataController.loginFaculty)

module.exports = router; 