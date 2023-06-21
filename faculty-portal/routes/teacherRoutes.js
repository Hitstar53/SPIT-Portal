const express = require("express");
const router = express.Router();
const { getFaculty, setFaculty, updateFaculty, deleteFaculty, loginFaculty, infoFaculty } = require('../controllers/teacherDataController');

router.post('/', setFaculty);
router.put('/:id', updateFaculty);
router.delete('/:id', deleteFaculty);
router.post('/login',loginFaculty)
router.get('/info',infoFaculty)

module.exports = router;