const express = require("express");
const router = express.Router();
const {
  setAppraisal,
  setDim1,
  getDim1,
  setDim2,
  getDim2,
  setDim3,
  getDim3,
  setDim4HOD,
  getDim4,
  getAppraisal,
  getAllAppraisal,
  HOD
} = require("../controllers/AppraisalController");

router.post("/", setAppraisal);
router.post("/dim1", setDim1);
router.post("/get/dim1", getDim1);
router.post("/dim2", setDim2);
router.post("/get/dim2", getDim2);
router.post("/dim3", setDim3);
router.post("/get/dim3", getDim3);
router.post("/hodreview", setDim4HOD);
router.post("/get/dim4", getDim4);
router.post("/getappraisal", getAppraisal);
router.post("/getallappraisal", getAllAppraisal);

module.exports = router;
