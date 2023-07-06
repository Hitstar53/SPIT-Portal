const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.put('/getUsers', userController.getUsers);
module.exports = router;