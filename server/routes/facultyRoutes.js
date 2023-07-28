const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
router.put('/getFaculty', facultyController.getFaculty);
router.put('/downloadStudent',facultyController.downloadStudent);

module.exports = router;