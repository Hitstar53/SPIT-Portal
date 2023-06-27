const express = require('express')
const router = express.Router()

const extracurricularController = require('../controllers/extracurricularController')
router.put('./setYourCommittee',extracurricularController.setYourCommittee)

module.exports = router