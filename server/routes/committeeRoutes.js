const express = require('express')
const router = express.Router()

const committeeController = require('../controllers/committeeController')
router.put('/committee', committeeController.setCommittee)
router.get('/getCommittee', committeeController.getAllCommittees)
router.delete('/deleteCommittee/:id',committeeController.deleteCommittee)
router.put('/updateCommittee',committeeController.updateCommittee)
router.get('/getCommitteeNames',committeeController.getCommitteeNames)
module.exports = router