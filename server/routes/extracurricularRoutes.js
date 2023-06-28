const express = require('express')
const router = express.Router()

const extracurricularController = require('../controllers/extracurricularController')
router.put('/setYourCommittee',extracurricularController.setYourCommittee)
router.put('/deleteYourCommittee',extracurricularController.deleteYourCommittee)
router.get('/getYourCommittee',extracurricularController.getYourCommittee)
router.put('/setVolunteerWork',extracurricularController.setVolunteerWork)
router.put('/deleteYourVolunteerWork',extracurricularController.deleteYourVolunteerWork)
router.get('/getYourVolunteerWork',extracurricularController.getYourVolunteerWork)
router.put('/setParticipation',extracurricularController.setParticipation)
router.put('/deleteParticipation',extracurricularController.deleteParticipation)
router.get('/getParticipation',extracurricularController.getParticipation)
module.exports = router