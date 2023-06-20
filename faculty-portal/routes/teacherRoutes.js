const express = require("express");
const router = express.Router();
const { getFaculty, setFaculty, updateFaculty, deleteFaculty } = require('../controllers/teacherDataController');


router.get('/', getFaculty);
router.post('/', setFaculty);
router.put('/:id', updateFaculty);
router.delete('/:id', deleteFaculty);


module.exports = router;