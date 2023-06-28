const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profileController')
router.put('/personal', profileController.updatePersonalInfo)
router.put('/parental', profileController.updateParentalInfo)
router.put('/photo', profileController.updateProfilePic)
router.put('/educational',profileController.updateEducationalInfo)
router.get('/getPersonal',profileController.getPersonalInfo)
router.get('/getParental',profileController.getParentalInfo)
router.get('/getEdu',profileController.getEduInfo)
router.get('/getExams',profileController.getExams)
module.exports = router
