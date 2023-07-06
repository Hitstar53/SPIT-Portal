const express = require('express')
const router = express.Router()
 
const adminRouter  = require('../controllers/adminController')
router.put('/initializeStudent',adminRouter.intitializeStudent);
router.put('/initializeFaculty',adminRouter.intitializeFaculty);
module.exports = router;