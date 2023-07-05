const express = require('express')
const router = express.Router()

const announcementRouter = require('../controllers/announcementsController');
router.put('/setAnnouncement',announcementRouter.setAnnouncement);

module.exports = router;