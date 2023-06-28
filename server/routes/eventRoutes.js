const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
router.post('/', eventController.setEvent)
router.get('/getEvents',eventController.getEvent)
router.delete('/deleteEvent/:id',eventController.deleteEvent)
module.exports = router