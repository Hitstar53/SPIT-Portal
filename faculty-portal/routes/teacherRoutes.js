const express = require("express");
const router = express.Router();
const { getFaculty, setFaculty, updateFaculty, deleteFaculty, loginFaculty,  } = require('../controllers/teacherDataController');

router.post('/', setFaculty);
router.post('/update', updateFaculty);
router.delete('/:id', deleteFaculty);
router.post('/login',loginFaculty)

module.exports = router;