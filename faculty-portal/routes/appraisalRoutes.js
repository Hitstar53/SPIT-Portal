const express = require("express");
const router = express.Router();
const {
  setAppraisal,
  getAppraisal,
  updateAppraisal,
  deleteAppraisal,
} = require("../controllers/AppraisalController");

// router.get("/:id", getAppraisal);
// router.post("/", setAppraisal);
// router.put("/:id", updateAppraisal);
// router.delete("/:id", deleteAppraisal);

module.exports = router;
