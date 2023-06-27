const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profileController')
router.put('/personal', profileController.updatePersonalInfo)
router.put('/personal/photo',profileController.updateProfilePic)
module.exports = router