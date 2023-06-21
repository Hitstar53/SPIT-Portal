const express = require("express");
const router = express.Router();
const { getFaculty, setFaculty, updateFaculty, deleteFaculty, loginFaculty } = require('../controllers/teacherDataController');


router.get('/:id', getFaculty);
router.post('/', setFaculty);
router.put('/:id', updateFaculty);
router.delete('/:id', deleteFaculty);
router.post('/login',loginFaculty)

module.exports = router;