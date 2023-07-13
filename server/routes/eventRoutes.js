const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
router.put('/setEvents', eventController.setEvent)
router.get('/getEvents',eventController.getEvent)
router.delete('/deleteEvent/:id',eventController.deleteEvent)
router.put('/setCommitteeEvents',eventController.setCommitteeEvents)
router.put('/getCommitteeEvents',eventController.getCommitteeEvents)
module.exports = router