const express = require('express')
const router = express.Router()

const careerConnectController = require('../controllers/careerConnectController')
router.put('/setInternship',careerConnectController.setInternship)

module.exports = router