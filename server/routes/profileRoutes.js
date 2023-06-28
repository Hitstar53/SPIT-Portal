const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profileController')
router.put('/personal', profileController.updatePersonalInfo)
router.put('/parental', profileController.updateParentalInfo)
router.put('/photo', profileController.updateProfilePic)
router.put('/educational',profileController.updateEducationalInfo)
router.put('/getPersonal',profileController.getPersonalInfo)
router.put('/getParental',profileController.getParentalInfo)
router.put('/getEdu',profileController.getEduInfo)
router.put('/getExams',profileController.getExams)
router.put('/getMiniDrawer',profileController.getMiniDrawer)
module.exports = router
