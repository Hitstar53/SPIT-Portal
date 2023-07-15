const express = require('express')
const router = express.Router()

const searchController = require('../controllers/SearchController');
router.put('/getProfessionalInfo',searchController.getProfessionalInfo);

module.exports = router