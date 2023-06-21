const express = require("express");
const router = express.Router();
const {
  setAppraisal,
} = require("../controllers/AppraisalController");

router.post("/", setAppraisal);

module.exports = router;
