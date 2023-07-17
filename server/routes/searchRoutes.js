const express = require('express')
const router = express.Router()

const searchController = require('../controllers/SearchController');
router.put('/getProfessionalInfo',searchController.getProfessionalInfo);
router.put('/getProjectsInfo',searchController.getProjectsInfo);
router.put('/getGeneralInfo',searchController.getGeneralInfo);
module.exports = router