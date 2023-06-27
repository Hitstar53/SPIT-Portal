const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profileController')
router.put('/personal', profileController.updatePersonalInfo)
module.exports = router