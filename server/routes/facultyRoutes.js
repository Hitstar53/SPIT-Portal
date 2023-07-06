const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
router.put('/getFaculty', facultyController.getFaculty);
module.exports = router;