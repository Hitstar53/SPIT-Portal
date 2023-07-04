const express = require("express");
const router = express.Router();
const {
  setAppraisal,
  setDim1,
  setDim2,
  setDim3,
  setDim4,
} = require("../controllers/AppraisalController");

router.post("/", setAppraisal);
router.post("/dim1", setDim1);
router.post("/dim2", setDim2);

module.exports = router;
