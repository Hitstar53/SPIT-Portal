const express = require("express");
const router = express.Router();
const {
  setAppraisal,
  getAppraisal,
} = require("../controllers/AppraisalController");

router.post("/", setAppraisal);
router.post("/get", getAppraisal);

module.exports = router;
